import { Box, Container, Heading, Image, Text, useColorMode } from 'theme-ui'
import Link from './Link'
import ColorSwitcher from './color-switcher'
import { Author, PostTags } from './Post'
import SignIn from './SignIn'
import useDocument from '@/lib/useDocument'
import useReferrer from '@/lib/useReferrer'

function UnstyledLink({ children, ...props }) {
  return (
    <Link {...props} sx={{ color: 'inherit', textDecoration: 'none' }}>
      {children}
    </Link>
  )
}

export default function Header({ post }) {
  const concise = false;
  const [colorMode, setColorMode] = useColorMode()
  const document = useDocument()
  const referrer = useReferrer()

  return (
    <>
      <Box
        variant="wide"
        sx={{
          bg: colorMode == 'light' ? 'black' : 'darker',
          borderBottom: '1px solid',
          borderColor: 'sheet',
          height: '64px',
          position: 'sticky',
          top: '0px',
          left: '0px',
          zIndex: 1000,
          display: 'flex'
        }}
      >
        <Container
          variant="wide"
          sx={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 3,
            px: 3,
            height: '64px',
            display: 'flex',
            position: 'relative'
          }}
        >
          <Link
            href="/"
            sx={{
              height: '40px'
            }}
          >
            <Image
              src="https://assets.hackclub.com/hcb-light.svg"
              alt="HCB Logo"
              sx={{
                height: '100%',
              }}
            />
          </Link>

          <Heading
            sx={{
              color: 'white'
            }}
            variant="headline"
          >
            <Link
              href="/"
              sx={{
                height: '40px',
                textDecoration: 'none',
                m: 0,
                color: 'inherit'
              }}
            >
              HCB Blog
            </Link>
          </Heading>

          {/* <SignIn color="white" /> */}

          <ColorSwitcher />
        </Container>
      </Box>

      <Box
        as="header"
        sx={{
          background: [
            'sheet',
            'sheet',
            'sheet',
            colorMode == 'light'
              ? 'linear-gradient(90deg, rgba(249,250,252,1) 27%, rgba(221,229,237,1) 80%)'
              : 'sheet'
          ],
          color: 'text',
          position: 'relative'
        }}
        id="top"
      >
        {!post && <>
          <Image
            src="/ui.png"
            alt="UI"
            sx={{
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              height: '100%',
              opacity: 1,
              zIndex: 999,
              display: [
                'none',
                'none',
                'none',
                colorMode == 'light' ? 'block' : 'none'
              ]
            }}
          />
          <Image
            src="/ui-dark.png"
            alt="UI"
            sx={{
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              height: '100%',
              opacity: 1,
              zIndex: 999,
              display: [
                'none',
                'none',
                'none',
                colorMode == 'light' ? 'none' : 'block'
              ]
            }}
          />
        </>}

        <Container
          variant="wide"
          sx={{
            background: [
              'sheet',
              'sheet',
              'sheet',
              colorMode == 'light'
                ? 'linear-gradient(90deg, rgba(249,250,252,1) 27%, rgba(221,229,237,1) 80%)'
                : 'sheet'
            ],
            ...(concise
              ? {
                pt: 4,
                pb: 2,
                display: 'flex',
                justifyContent: 'center',
                position: 'relative'
              }
              : { pt: 5, pb: [3, 4], position: 'relative' })
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flexDirection: 'row',
              mb: 4,
              px: [3, 3, 0],
              gap: 3,
              ...(concise
                ? {
                  width: '100%',
                  maxWidth: '800px'
                }
                : {})
            }}
          >
            <Link href="/" sx={{
              display: ["none", "none", "block"]
            }}>
              <Image
                src="https://assets.hackclub.com/hcb-light.svg"
                alt="HCB Logo"
                sx={{
                  height: '50px',
                  visibility: post ? "hidden" : "visible"
                }}
              />
            </Link>
            <Box mt={0}>
              {post ? (
                <>
                  {(document?.referrer == 'http://localhost:3000/' ||
                    referrer == '/') && (
                      <Text
                        variant="subheadline"
                        sx={{
                          display: 'block',
                          mb: 4
                        }}
                      >
                        <Link href={`/#${post.meta.slug}`}>← All Posts</Link>
                      </Text>
                    )}

                  <Heading mt={-1} mb={1} as="h2" sx={{
                    fontSize: 4,
                  }}>
                    {post.meta.title}
                  </Heading>
                  <Box sx={{
                    display: "flex",
                    flexDirection: ["column", "column", "row"],
                    alignItems: ["start", "start", "center"],
                    justifyContent: "start",
                    gap: [1, 1, 3],
                    my: [2, 2, 0]
                  }}>
                    <Heading as="h3" sx={{
                      fontSize: 2,
                      fontWeight: 500,
                      color: "secondary",
                      display: "inline-flex"
                    }}>
                      {post.meta.date.toLocaleDateString('en-us', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: "Etc/UTC"
                      })}
                    </Heading>
                    <PostTags tags={post.meta.tags} category={post.meta.category} />
                  </Box>
                  <Author id={post.meta.authors[0]} sx={{
                    color: "secondary",
                    fontWeight: 400
                  }} />
                </>
              ) : (
                <>
                  <UnstyledLink href="/">
                    <Heading mt={-1} mb={1} as="h1" variant="title">
                      HCB Blog
                    </Heading>
                  </UnstyledLink>
                  <Heading as="h2" variant="eyebrow">
                    The latest on all-things HCB
                  </Heading>
                </>
              )}

              {!post && (
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 3 }}
                >
                  <Heading
                    as="h3"
                    variant="subheadline"
                    sx={{ color: 'muted', m: 0 }}
                  >
                    <Link href="https://hackclub.com/hcb" target="_blank">What's HCB? →</Link>
                  </Heading>

                  <SignIn />
                </Box>
              )}
            </Box>
          </Box>
        </Container>
        <Box sx={{display: 'none'}}>
          {colorMode}
        </Box>
      </Box>
    </>
  )
}
