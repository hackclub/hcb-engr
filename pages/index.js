import { posts } from '../content'
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text
} from 'theme-ui'
import Header from '../components/Header'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import { DisplayProvider } from '@/lib/display'
import { PostTags } from '@/components/Post'
import { useQueryParam, StringParam } from 'use-query-params';
import Head from 'next/head'

function PostPreview({ post }) {
  const PostBody = post.component
  return (
    <DisplayProvider display="home">
      <PostBody />
    </DisplayProvider>
  )
}

export default function Home() {
  const [tag, setTag] = useQueryParam('tag', StringParam);

  useEffect(() => {
    if (!localStorage.getItem("initialVisit")) {
      localStorage.setItem("initialVisit", Date.now());
    }

    localStorage.setItem("lastPostVisit", posts.toReversed()[0].meta.slug);
  }, []);

  return (
    <>
      <Header />
      <Head>
        <title>HCB Blog</title>
        <meta
          property="og:image"
          content="https://bank.engineering/og-v1.png"
        />
      </Head>


      <Box as="main" sx={{ color: 'text' }} className="post-list">
        <Container as="article" variant="wide" sx={{ pt: 5, pb: [4, 5] }}>
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
          {posts.filter(post => tag ? (post.meta.tags || []).includes(tag) : true).toReversed().map((post, i) => (
            <>
              <PostPreview key={post.meta.slug} post={post} />
              {i < posts.length - 1 && <Divider my={5} />}
            </>
          ))}
        </Container>

        <Footer />
      </Box>
    </>
  )
}
