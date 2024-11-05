import * as rawPosts from './posts/posts.js'
import authors from './authors/authors.js'
import { Heading, Link, Text } from 'theme-ui'
import theme from '@hackclub/theme'

const posts = Object.entries(rawPosts).map(
  ([_, { default: rawComponent }]) => ({
    meta: rawComponent.__proto__.meta,
    rawComponent,
    component: props => {
      const Component = rawComponent
      return (
        <Component
          components={{
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
            a: props => <Link {...props} />,
            p: props => <Text my={2} as="p" {...props} sx={{ fontSize: 2 }} />
          }}
          {...props}
        />
      )
    }
  })
)

export { posts, authors }
