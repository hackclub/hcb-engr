import { Box, Container, Heading, Image, Link } from "theme-ui";

function UnstyledLink({ children, ...props }) {
    return (
        <Link {...props} sx={{ color: "inherit", textDecoration: "none" }}>
            {children}
        </Link>
    )
}

export default function Header({ concise }) {
    return (
        <Box as="header" sx={{ bg: 'sheet', color: 'text' }} id="top">
            <Container variant="wide" sx={concise ? { pt: 4, pb: 2 } : { pt: 5, pb: [3, 4] }}>

                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    mb: 4,
                    gap: 3
                }}>
                    <Link href="/">
                        <Image src="https://assets.hackclub.com/hcb-light.svg" alt="HCB Logo" sx={{
                            height: "50px"
                        }} />
                    </Link>
                    <Box mt={0}>
                        {concise ? <>
                            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 4 }} mt={0} mb={1}>
                                <UnstyledLink href="/">
                                    <Heading m={0} as="h1" variant="title" sx={{
                                        fontSize: [4, 5],
                                    }}>HCB Blog</Heading>
                                </UnstyledLink>
                                <Heading m={0} as="h2" variant="eyebrow">The latest on all-things HCB</Heading>
                            </Box>
                        </> : <>
                            <UnstyledLink href="/">
                                <Heading mt={-1} mb={1} as="h1" variant="title">HCB Blog</Heading>
                            </UnstyledLink>
                            <Heading as="h2" variant="eyebrow">The latest on all-things HCB</Heading>
                        </>}

                        {!concise && <Box sx={{ display: "flex", alignItems: "center", gap: 4, mt: 3 }}>
                            <Heading as="h3" variant="subheadline" sx={{ color: "muted", m: 0 }}>
                                <Link href="https://hackclub.com/hcb">What's HCB? →</Link>
                            </Heading>


                            <Heading as="h3" variant="subheadline" sx={{ color: "muted", m: 0 }}>
                                <Link href="https://hcb.hackclub.com">Log in to HCB →</Link>
                            </Heading>
                        </Box>}
                    </Box>
                </Box>
            </Container>

        </Box>
    )
}