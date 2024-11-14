import authors from './authors/authors.js'
import { Heading, Link, Text, useColorMode } from 'theme-ui'
import theme from '@hackclub/theme'
import * as rawPosts from '@/.posts-cache.js'
import Image from 'next/image.js'

const posts = Object.entries(rawPosts).map(
  ([_, { default: rawComponent }]) => {
    let meta = {};
    try {
      meta = rawComponent().type.meta;
    } catch (error) { }
    return ({
      meta,
      rawComponent,
      component: props => {
        const Component = rawComponent
        const [colorMode] = useColorMode();
        return (
          <Component
            components={{
              Image: props => <Image {...props} />,
              h1: props => {
                return (
                  <>
                    <Heading
                      variant="headline"
                      as="h1"
                      sx={{
                        fontSize: 4,
                        mb: 0,
                        mt: 4,
                        ':first-child': { mt: 1 }
                      }}
                      {...props}
                    />
                    <hr
                      style={{
                        margin: '0px',
                        backgroundColor: theme.colors.smoke,
                        height: '1px',
                        border: 0
                      }}
                    />
                  </>
                )
              },
              h2: props => (
                <Heading
                  variant="headline"
                  as="h2"
                  sx={{ fontSize: 3, mt: 24 }}
                  {...props}
                />
              ),
              h3: props => (
                <Heading
                  variant="headline"
                  as="h3"
                  sx={{ fontSize: 2 }}
                  {...props}
                />
              ),
              h4: props => (
                <Heading
                  variant="headline"
                  as="h4"
                  sx={{ fontSize: 1 }}
                  {...props}
                />
              ),
              h5: props => (
                <Heading
                  variant="headline"
                  as="h5"
                  sx={{ fontSize: 1, fontStyle: 'italic' }}
                  {...props}
                />
              ),
              pre: props => <pre style={{
                background: colorMode == "dark" ? theme.colors.darkless : theme.colors.slate,
                borderRadius: "6px",
                padding: "12px",
                width: "100%",
                ...props.style
              }}>
                <Text sx={{
                  span: {
                    bg: colorMode == "dark" ? "darkless" : "slate",
                    color: "cyan",
                  }
                }}>
                  {props.children}
                </Text>
              </pre>,
              code: props => <Text as="span" color="blue" bg="sheet" sx={{ borderRadius: 6, px: 1 }}><code style={{
                fontSize: "16px",
              }}>{props.children}</code></Text>,
              a: props => <Link {...props} />,
              p: props => <Text my={3} as="p" {...props} sx={{ fontSize: 2 }} />
            }}
            {...props}
          />
        )
      }
    })
  }
).sort((a, b) => a.meta.date.getTime() - b.meta.date.getTime())

export { posts, authors }
