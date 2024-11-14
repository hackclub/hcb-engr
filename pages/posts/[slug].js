import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Author } from '@/components/Post'
import { posts } from '@/content/index'
import { DisplayProvider } from '@/lib/display'
import Head from 'next/head'
import { Box, Card, Container, Flex, Grid, Heading, Link, Text } from 'theme-ui'

export default function Post({ slug }) {
  const post = posts.find(post => post.meta.slug === slug)
  const PostBody = post.component

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
              flexDirection: ['column', 'column', 'column', 'row'],
              justifyContent: 'space-between',
              px: "66px",
              gap: 5,
              mt: 4
            }}
            gap={6}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '800px'
              }}
            >
              <PostBody />
            </Box>
            <Card variant="sunken" sx={{
              width: '100%',
              maxWidth: ['100%', '100%', '100%', '300px', '400px'],
              height: "min-content"
            }}>
              <Heading as="h3" sx={{
                fontSize: 3,
                mb: 3
              }}>
                Related Posts
              </Heading>

              <Grid columns={[1, 2, 3, 1]} gap={3}>
                {posts.slice(0, 3).map(post => (
                  <Link href={`/posts/${post.meta.slug}`} key={post.meta.slug} sx={{
                    textDecoration: 'none'
                  }}>
                    <Card variant="interactive" sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 3,
                      height: "100%"
                    }}>
                      <Heading as="h4" sx={{
                        fontSize: 2,
                        mb: 2,
                        textAlign: 'center'
                      }}>
                        {post.meta.title}
                      </Heading>
                      <Author id={post.meta.authors[0]} />
                      <Text sx={{
                        color: 'muted',
                        fontSize: 1
                      }}>
                        {post.meta.date.toLocaleDateString('en-us', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          timeZone: "Etc/UTC"
                        })}
                      </Text>
                    </Card>
                  </Link>
                ))}
              </Grid>
            </Card>
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
