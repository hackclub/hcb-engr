const fs = require("fs");

function debounce(func) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, 300);
    };
}

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
