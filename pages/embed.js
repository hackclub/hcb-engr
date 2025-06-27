import { posts } from '../content'
import {
  Box,
  Container,
  Divider,
  Link,
} from 'theme-ui'
import { useEffect } from 'react'
import { DisplayProvider } from '@/lib/display'
import Head from 'next/head'
import Cookies from "js-cookie"

function PostPreview({ post, truncate }) {
  const PostBody = post.component
  return (
    <DisplayProvider display="home">
      <PostBody truncate={truncate} />
    </DisplayProvider>
  )
}

export default function Home() {
  useEffect(() => {
    if (!Cookies.get("initialVisit")) {
      Cookies.set("initialVisit", Date.now());
    }

    Cookies.set("lastPostVisit", posts.toReversed()[0].meta.slug);
  }, []);

  return (
    <>
      <Head>
        <title>HCB Blog</title>
        <meta
          property="og:image"
          content="https://bank.engineering/og-v1.png"
        />
      </Head>


      <Box as="main" sx={{ color: 'text' }} className="post-list">
        <Container as="article" variant="wide" sx={{ pt: 3, pb: [4, 5], px: 0 }}>
          {posts.toReversed().slice(0, 3).map((post, i) => (
            <Box className="truncate">
              <Link href={`/posts/${post.meta.slug}`} target="_blank" sx={{ textDecorationLine: "none", color: "white", px: 2, py: 4, display: "block", ":hover": { backgroundColor: "darker" } }}><PostPreview key={post.meta.slug} post={post} truncate /></Link>
              {i < 2 && <Divider />}
            </Box>
          ))}
          <Link href="/" target="_blank" sx={{ textAlign: "center", width: "100%", display: "block", fontSize: 3 }}>
            Keep reading
          </Link>
        </Container>
      </Box>
    </>
  )
}
