import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { posts } from '@/content/index'
import { DisplayProvider } from '@/lib/display'
import useDocument from '@/lib/useDocument'
import useReferrer from '@/lib/useReferrer'
import Head from 'next/head'
import { Box, Container, Flex, Link, Text } from 'theme-ui'

export default function Post({ slug }) {
  const post = posts.find(post => post.meta.slug === slug)
  const PostBody = post.component
  const document = useDocument()
  const referrer = useReferrer()

  return (
    <DisplayProvider display="detail">
      <Head>
        <title>{post.meta.title}</title>
        <meta
          property='og:description'
          content={`${post.meta.date.toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: "Etc/UTC"
          })}`}
        />

      </Head>
      <Header post={post} />
      <Box as="main" sx={{ color: 'text' }}>
        <Container
          as="article"
          variant="wide"
          sx={{ pt: 3, pb: [3, 4], minHeight: 'calc(100vh - 200px)' }}
        >
          <Flex
            sx={{
              flexDirection: ['column', 'row'],
              // justifyContent: 'center'
              px: "66px"
            }}
            gap={6}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '800px'
              }}
            >
              {(document?.referrer == 'http://localhost:3000/' ||
                referrer == '/') && (
                  <Text
                    variant="subheadline"
                    sx={{
                      display: 'block',
                      mb: 3
                    }}
                  >
                    <Link href={`/#${post.meta.slug}`}>← Back</Link>
                  </Text>
                )}

              <PostBody />
            </Box>
            <Box bg="green"></Box>
          </Flex>
        </Container>
      </Box>
      <Footer />
    </DisplayProvider>
  )
}

export async function getStaticPaths() {
  console.log(posts);


  const paths = posts.map(post => ({
    params: {
      slug: post.meta.slug
    }
  }))

  console.log(paths)

  return {
    paths,
    fallback: false // false or "blocking"
  }
}

export async function getStaticProps({ params }) {
  const post = posts.find(post => post.meta.slug === params.slug)

  return {
    props: {
      slug: params.slug
    }
  }
}
