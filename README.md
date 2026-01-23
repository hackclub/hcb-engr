# HCB Engineering Blog

https://blog.hcb.hackclub.com

## Modifying content

All content (posts and authors) can be found in the `/content` directory.

### Posts

Follow the following steps to create a new post:

1. Create a new directory in `/content/posts` with the name of the post. (use kebab-case)
2. Create a new file in the directory called `post.mdx`.
3. Use the following format for metadata and post content:

```mdx
import post from '@/components/Post.js'

export default post({
  title: 'My New Post',
  slug: 'my-new-post', // make sure this matches the directory name
  category: 'new' // one of "new", "newsletter", "improvement", or "news"
  tags: ["receipts"], // an array of tags
  authors: ["team"], // an array of authors (see /content/authors)
  date: new Date("2024-11-07"),
  primaryImage: image, // optionally, an image imported to be used in opengraph embeds
  description: "This is a new post" // a short description of the post for opengraph embeds
})

# Post content goes here using either markdown or JSX
```

Then you're done!

### `/lib/authors.js`

This file contains all of the authors that can be referenced in posts.
