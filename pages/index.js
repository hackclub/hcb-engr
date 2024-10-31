import { posts } from '../content'
import {
  Box,
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

function PostPreview({ post }) {
  const PostBody = post.component
  return (
    <DisplayProvider display="home">
      <PostBody />
    </DisplayProvider>
  )
}

export default function Home() {
  return (
    <>
      <Header />
      <title>HCB Blog</title>

      <Box as="main" sx={{ color: 'text' }} className="post-list">
        <Container as="article" variant="wide" sx={{ pt: 5, pb: [4, 5] }}>
          {posts.toReversed().map((post, i) => (
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
