import { posts } from '../content'
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
} from 'theme-ui'
import { useEffect } from 'react'
import { DisplayProvider } from '@/lib/display'
import { PostTags } from '@/components/Post'
import { useQueryParam, StringParam } from 'use-query-params';
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
  const [tag, setTag] = useQueryParam('tag', StringParam);

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
          {tag && <Card variant="sunken" sx={{
            mx: [3, 3, 66],
            mb: 5,
            mt: -32,
            padding: "20px!important",
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
            <Flex sx={{
              gap: 3,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'start',
            }}>
              <Heading gas="h3" variant="lead" sx={{ margin: "0px!important" }}>
                Showing posts with tag
              </Heading>
              <PostTags tags={[tag]} />
            </Flex>
            <Button sx={{
              padding: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40
            }} onClick={() => {
              setTag(undefined)
            }}>
              <span style={{
                transform: "scale(1.8)",
                lineHeight: 0,
              }}>
                ×
              </span>
            </Button>
          </Card>}
          {posts.filter(post => tag ? (post.meta.tags || []).includes(tag) : true).toReversed().slice(0, 3).map((post, i) => (
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
