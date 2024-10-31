import { useRouter } from 'next/router'
import { Box, Container, Heading, Image, Link } from 'theme-ui'

export default function Footer() {
  const router = useRouter()

  return (
    <Box as="footer" sx={{ bg: 'sheet', color: 'text' }}>
      <Container variant="wide" sx={{ pt: 4, pb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'row',
            mb: 4,
            gap: 3,
            width: '100%'
          }}
        >
          <Box
            mt={0}
            sx={{
              width: '100%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 4,
                mt: 3
              }}
            >
              {router.pathname != '/' ? (
                <Heading
                  as="h3"
                  variant="subheadline"
                  sx={{ color: 'muted', m: 0 }}
                >
                  <Link href="/">Read more posts from HCB →</Link>
                </Heading>
              ) : (
                <Box />
              )}

              <Heading
                as="h3"
                variant="subheadline"
                sx={{ color: 'muted', m: 0 }}
              >
                <Link href="#top">Scroll to top ↑</Link>
              </Heading>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
