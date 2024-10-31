import { Box, Container, Heading, Image, Text, useColorMode } from "theme-ui";
import Link from "../components/Link";
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
    const [colorMode, setColorMode] = useColorMode();
    return (
        <>
            <Container variant="wide" sx={{
                bg: colorMode == "light" ? "black" : "darker",
                borderBottom: "1px solid",
                borderColor: "sheet",
                height: "64px",
                position: "sticky",
                top: "0px",
                left: "0px",
                zIndex: 1000,
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

                {/* <SignIn color="white" /> */}


                <ColorSwitcher />
            </Container>

            <Box as="header" sx={{
                background: ["sheet", "sheet", "sheet", colorMode == "dark" ? "sheet" : "linear-gradient(90deg, rgba(249,250,252,1) 27%, rgba(221,229,237,1) 80%)"],
                color: 'text'
            }}>
                <Container variant="wide" sx={concise ? { pt: 4, pb: 2, display: "flex", justifyContent: "center", position: "relative" } : { pt: 5, pb: [3, 4], position: "relative" }}>

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
                        } : {}),
                    }}>
                        <Image src="/ui.png" alt="UI" sx={{
                            position: "absolute",
                            bottom: "0px",
                            right: "0px",
                            height: "100%",
                            opacity: 1,
                            zIndex: 999,
                            display: ["none", "none", "none", colorMode == "light" ? "block" : "none"]
                        }} />
                        <Image src="/ui-dark.png" alt="UI" sx={{
                            position: "absolute",
                            bottom: "0px",
                            right: "0px",
                            height: "100%",
                            opacity: 1,
                            zIndex: 999,
                            display: ["none", "none", "none", colorMode == "dark" ? "block" : "none"]
                        }} />
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

                                <SignIn />
                            </Box>}
                        </Box>
                    </Box>
                </Container>

            </Box>
        </>
    )
}