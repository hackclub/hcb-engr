import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Author, PostTags } from '@/components/Post'
import { posts } from '@/content/index'
import { DisplayProvider } from '@/lib/display'
import Head from 'next/head'
import { Box, Card, Container, Flex, Grid, Heading, Link, Text } from 'theme-ui'

const relatedPosts = post => {
  const { meta } = post;

  const relatedPosts = [];

  for (const post of posts.filter(post => post.meta.slug !== meta.slug)) {
    const sharedTags = (post.meta.tags || []).filter(tag => (meta.tags || []).includes(tag)).length;
    const sharedTitleWords = Math.min(post.meta.title.split(' ').filter(word => meta.title.split(' ').includes(word)).length, 99);
    const sharedAuthors = post.meta.authors.filter(author => meta.authors.includes(author)).length;
    const sharedCategory = post.meta.category === meta.category;
    const timeDifferenceInDays = Math.abs(meta.date - post.meta.date) / (1000 * 60 * 60 * 24);

    const score = sharedTags * 100_000_000_000 + sharedTitleWords * 1_100_000_000 + sharedAuthors * 100_000_000 + sharedCategory * 10_000 + (9_000 - timeDifferenceInDays);
    relatedPosts.push({ post, score });
  }

  relatedPosts.sort((a, b) => b.score - a.score);

  console.log({ relatedPosts })

  return relatedPosts.slice(0, 3).map(({ post }) => post);
}

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
              px: [3, 3, "66px"],
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
              maxWidth: ['100%', '100%', '100%', 'max(250px, min(500px, 30vw))'],
              height: "min-content"
            }}>
              <Heading as="h3" sx={{
                fontSize: 3,
                mb: 3
              }}>
                Related Posts
              </Heading>

              <Grid columns={[1, 2, 3, 1]} gap={3}>
                {relatedPosts(post).map(post => (
                  <Link href={`/posts/${post.meta.slug}`} key={post.meta.slug} sx={{
                    textDecoration: 'none'
                  }}>
                    <Card variant="interactive" sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'start',
                      alignItems: 'start',
                      padding: "22px!important",
                      height: "100%"
                    }}>
                      <Heading as="h4" sx={{
                        fontSize: 2
                      }}>
                        {post.meta.title.replace(/ (?!.* )/, '\u00A0') /* replace last space with non-breaking space */}
                      </Heading>
                      <PostTags tags={post.meta.tags} />
                      <Flex sx={{
                        justifyContent: 'space-between',
                        width: '100%',
                        gap: 1,
                        flexDirection: ["column", "column", "column", "row-reverse"]
                      }}>
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
                        <Author id={post.meta.authors[0]} small />
                      </Flex>
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
