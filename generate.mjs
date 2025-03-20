import path from "path";
import headway from "./headway.json" with { type: "json" };
import fs from "fs";

const changelogs = headway.data.changelogs.collection;

const hashFunction = str => (Math.abs(10 ** 5 + str.padStart(4, "9").split('').reduce((hash, chr) => (hash << 5) - hash + chr.charCodeAt(0), 0) * 97)).toString(36);

console.log(changelogs[0]);


for (const post of changelogs) {
  try {
    const slug = post.param.replace(/[^\w-]/g, '');
    const author = post.author?.displayName?.split?.(",")?.[0]?.split?.(" ")?.[0]?.toLowerCase?.();
    const category = post.categories?.[0]?.name?.toLowerCase?.();

    let postMarkdown = post.markdown.replace(`[${post.categories[0].name}]`, "").trim();

    const folder = path.join("./content/posts/", slug);
    await fs.promises.mkdir(folder);

    const imageLinks = postMarkdown.match(/!\[.*?\]\(https\:\/\/cloud\.headwayapp\.co\/.*?( =\d{1,2}%){0,1}\)/g) || [];

    for (const image of imageLinks) {
      let [name, url] = image.split("](");
      name = name.substring(2);
      url = url.split(" ")[0];

      const extension = url.split(".").pop();
      const identifier = ("headway_" + name.replace(/\W/g, '')).substring(0, 50);
      const hashName = identifier + "_" + hashFunction(url) + "." + extension;
      const filePath = path.join(folder, hashName);

      // save file from url to name using fetch and fs
      const buffer = await fetch(url).then(res => res.arrayBuffer());
      await fs.promises.writeFile(filePath, Buffer.from(buffer));

      postMarkdown = postMarkdown.replace(image, `
import ${identifier} from "./${hashName}";
      
<Image src={${identifier}} alt={${JSON.stringify(name)}} />
`);
    }

    console.log(imageLinks)

    const postMdx = `import post from '@/components/Post';
export default post({
  title: ${JSON.stringify(post.title)},
  slug: ${JSON.stringify(slug)},
  category: ${category ? JSON.stringify(category) : "null, // no categories on headway"},
  tags: [],
  authors: ${author ? JSON.stringify([author]) : `"team", // raw author: ${post.author?.displayName}`},
  date: new Date(${JSON.stringify(post.date)}),
  headwayUrl: ${JSON.stringify(post.url)} // published: ${post.published}
});

${postMarkdown}
`

    await fs.promises.writeFile(path.join(folder, "post.mdx"), postMdx);

    console.log(postMdx)
  } catch (error) {
    console.error(`ERROR (post slug ${post.slug}):`, error);
  }
}