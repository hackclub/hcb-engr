import { Box, Container, Heading, Image, Link, Text } from "theme-ui";
import ColorSwitcher from '../components/color-switcher'
import SignIn from "./SignIn";

function UnstyledLink({ children, ...props }) {
    return (
        <Link {...props} sx={{ color: "inherit", textDecoration: "none" }}>
            {children}
        </Link>
    )
}

export default function Header({ concise }) {
    return (
        <>
            <Container variant="wide" bg="black" sx={{
                height: "64px",
                position: "sticky",
                top: "0px",
                left: "0px",
                zIndex: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 3
            }} id="top">
                <Link href="/" sx={{
                    height: "40px"
                }}>
                    <Image src="https://assets.hackclub.com/hcb-light.svg" alt="HCB Logo" sx={{
                        height: "100%"
                    }} />
                </Link>

                <Heading sx={{
                    color: "white"
                }} variant="headline">HCB Blog</Heading>


                <ColorSwitcher />
            </Container>

            <Box as="header" sx={{ bg: 'sheet', color: 'text' }}>
                <Container variant="wide" sx={concise ? { pt: 4, pb: 2, display: "flex", justifyContent: "center" } : { pt: 5, pb: [3, 4] }}>

                    <SignIn />

                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        flexDirection: "row",
                        mb: 4,
                        gap: 3,
                        ...(concise ? {
                            width: "100%",
                            maxWidth: "800px",
                        } : {})
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
        </>
    )
}