# hcb-engr site

Work-in-progress HCB engineering blog

## Modifying content

All content (posts and authors) can be found in the `/content` directory.

### Posts

Follow the following steps to create a new post:

1. Create a new directory in `/content/posts` with the name of the post. (use kebab-case)
2. Create a new file in the directory called `post.mdx`.
3. Add the following frontmatter to the file:

```mdx
import post from '@/components/Post.js'

export default post({
  title: 'My New Post',
  id: 'my-new-post', // make sure this matches the directory name
  category: 'new' // one of "new", "newsletter", "improvement"
})

# Post content goes here using either markdown or JSX
```

Then you're done!

### `/lib/authors.js`

This file contains all of the authors that can be referenced in posts.
