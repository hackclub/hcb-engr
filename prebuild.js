const fs = require("fs");
const path = require("path");

const SITE_URL = 'https://blog.hcb.hackclub.com';
const PUBLIC_POSTS_DIR = path.join(__dirname, 'public', 'posts');

function debounce(func) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, 300);
    };
}

// ---------------------------------------------------------------------------
// Markdown generation
// ---------------------------------------------------------------------------

/**
 * Extracts the metadata passed to `post({...})` inside a post's MDX source.
 * We rely on simple regex rather than a full JS parser because the shape is
 * constrained by conventions in /content/posts and a README-specified schema.
 */
function extractPostMeta(src) {
    const meta = {};
    const pullString = field => {
        const re = new RegExp(`\\b${field}:\\s*(['"\`])((?:\\\\.|(?!\\1).)*)\\1`);
        const m = src.match(re);
        return m ? m[2] : null;
    };
    const pullArray = field => {
        const re = new RegExp(`\\b${field}:\\s*\\[([\\s\\S]*?)\\]`);
        const m = src.match(re);
        if (!m) return [];
        return [...m[1].matchAll(/(['"`])((?:\\.|(?!\1).)*)\1/g)].map(x => x[2]);
    };
    const pullDate = () => {
        const m = src.match(/\bdate:\s*new Date\((['"`])([^'"`]+)\1\)/);
        return m ? m[2] : null;
    };
    meta.title = pullString('title');
    meta.slug = pullString('slug');
    meta.category = pullString('category');
    meta.description = pullString('description');
    meta.tags = pullArray('tags');
    meta.authors = pullArray('authors');
    meta.date = pullDate();
    return meta;
}

function yamlString(value) {
    if (value == null) return '';
    const str = String(value);
    if (/^[a-zA-Z0-9_.\-\/:]+$/.test(str)) return str;
    return '"' + str.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

function buildFrontmatter(meta) {
    const lines = ['---'];
    if (meta.title) lines.push(`title: ${yamlString(meta.title)}`);
    if (meta.slug) lines.push(`slug: ${yamlString(meta.slug)}`);
    if (meta.date) lines.push(`date: ${meta.date}`);
    if (meta.category) lines.push(`category: ${yamlString(meta.category)}`);
    if (meta.authors && meta.authors.length) {
        lines.push(`authors: [${meta.authors.map(yamlString).join(', ')}]`);
    }
    if (meta.tags && meta.tags.length) {
        lines.push(`tags: [${meta.tags.map(yamlString).join(', ')}]`);
    }
    if (meta.description) lines.push(`description: ${yamlString(meta.description)}`);
    if (meta.slug) lines.push(`canonical: ${SITE_URL}/posts/${meta.slug}`);
    lines.push('---');
    return lines.join('\n');
}

/**
 * Transforms a post's MDX source into a plain-markdown body:
 *   - Removes all `import` statements (they aren't needed in the output).
 *   - Removes the wrapping `export default post({...})` block.
 *   - Rewrites `<Image src={identifier} alt="..." />` to a markdown image,
 *     copying the referenced local asset to `public/posts/<slug>/<file>` so
 *     the image resolves when the .md is served.
 *
 * Other JSX tags (<video>, <table>, <Preview>, <Author>, …) are intentionally
 * left intact — they're readable to LLMs and uncommon enough that hand-rolled
 * conversions would add risk without much benefit.
 */
function transformMdx(src, slug, postDir, outAssetDir) {
    // 1. Collect local asset imports, e.g. `import foo from "./bar.png"`.
    const importMap = {};
    const importRe = /^[ \t]*import\s+(\w+)\s+from\s+['"]\.\/([^'"]+)['"];?[ \t]*$/gm;
    for (const m of src.matchAll(importRe)) {
        const [, id, file] = m;
        importMap[id] = file;
        const srcAsset = path.join(postDir, file);
        if (fs.existsSync(srcAsset)) {
            fs.mkdirSync(outAssetDir, { recursive: true });
            try {
                fs.copyFileSync(srcAsset, path.join(outAssetDir, file));
            } catch (e) {
                // non-fatal; asset will just not resolve
            }
        }
    }

    let body = src;

    // 2. Strip every `import ... from '...'` line (top-level or mid-body).
    body = body.replace(/^[ \t]*import\s[^\n]*?\sfrom\s+['"][^'"]+['"];?[ \t]*$/gm, '');

    // 3. Strip the `export default post({...})` block.
    body = body.replace(/^export\s+default\s+post\(\{[\s\S]*?^\}\);?\s*$/m, '');

    // 4. Rewrite <Image src={identifier} alt=... /> to markdown when we can.
    body = body.replace(/<Image\s+([^>]*?)\/>/g, (match, attrs) => {
        const srcMatch = attrs.match(/src=\{(\w+)\}/);
        if (!srcMatch || !importMap[srcMatch[1]]) return match;
        const altMatch = attrs.match(/alt=(?:"([^"]*)"|\{"([^"]*)"\})/);
        const alt = altMatch ? (altMatch[1] !== undefined ? altMatch[1] : altMatch[2]) : '';
        return `![${alt}](${SITE_URL}/posts/${slug}/${importMap[srcMatch[1]]})`;
    });

    // 5. Collapse the triple+ blank lines left behind by stripping imports.
    body = body.replace(/\n{3,}/g, '\n\n');

    return body.trim();
}

function buildMarkdown() {
    const slugs = fs.readdirSync('./content/posts').filter(file => !file.includes('.'));
    // We're the exclusive owner of public/posts/ (gitignored). Wipe any stale
    // output from previous runs so deleted posts don't linger as ghost URLs.
    if (fs.existsSync(PUBLIC_POSTS_DIR)) {
        fs.rmSync(PUBLIC_POSTS_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(PUBLIC_POSTS_DIR, { recursive: true });

    let written = 0;
    for (const slug of slugs) {
        const postDir = path.join('content', 'posts', slug);
        const mdxPath = path.join(postDir, 'post.mdx');
        if (!fs.existsSync(mdxPath)) continue;
        try {
            const src = fs.readFileSync(mdxPath, 'utf8');
            const meta = extractPostMeta(src);
            meta.slug = meta.slug || slug;
            const outAssetDir = path.join(PUBLIC_POSTS_DIR, slug);
            const body = transformMdx(src, slug, postDir, outAssetDir);
            const frontmatter = buildFrontmatter(meta);
            const output = `${frontmatter}\n\n${body}\n`;
            fs.writeFileSync(path.join(PUBLIC_POSTS_DIR, `${slug}.md`), output);
            written++;
        } catch (err) {
            console.error(`[md gen] failed for ${slug}:`, err.message);
        }
    }
    console.log(`[md gen] wrote ${written} markdown files to public/posts/`);
}

// ---------------------------------------------------------------------------
// Posts-cache generation (existing behavior)
// ---------------------------------------------------------------------------

function build() {
    console.log("Detected changes in content/posts");

    const posts = fs.readdirSync("./content/posts").filter(file => !file.includes("."));

    const nonce = i => i ? (i.toString().padStart(3, "0") + Date.now()) : Date.now();

    const file = /*js*/`
// This file is automatically generated by /prebuild.js
// Do not modify this file directly or commit to source control
${posts.map((post, i) => /*js*/`
// ${post}
export * as post_${nonce(i)} from "@/content/posts/${post}/post.mdx?${nonce()}";
`).join("")}

// Generated at ${new Date().toISOString()}
`

    fs.writeFileSync("./.posts-cache.js", file);

    buildMarkdown();
}

if (process.argv.includes("--build")) {
    build();
} else if (process.argv.includes("--watch")) {
    fs.watch('./content/posts', {
        recursive: true
    }, debounce(build));

    console.log("Watching for changes in content/posts");
} else {
    throw "Please specify --build or --watch";
}
