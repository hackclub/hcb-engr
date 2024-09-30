import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { posts } from "@/content/index";
import { Box, Container, Grid } from "theme-ui";

export default function Post({ slug }) {
    const post = posts.find(post => post.meta.slug === slug);
    const PostBody = post.component;

    return (
        <>
            <Header concise />
            <Box as="main" sx={{ color: 'text' }}>
                <Container as="article" variant="wide" sx={{ pt: 3, pb: [3, 4] }}>

                    <Grid columns={["1fr"]} gap={6}>
                        <Box>
                            <PostBody />
                        </Box>

                    </Grid>
                </Container>
            </Box>
            <Footer />
        </>
    )
}

export async function getStaticPaths() {
    const paths = posts.map(post => ({
        params: {
            slug: post.meta.slug
        }
    }));

    return {
        paths,
        fallback: false, // false or "blocking"
    }
}

export async function getStaticProps({ params }) {
    const post = posts.find(post => post.meta.slug === params.slug);

    return {
        props: {
            slug: params.slug
        }
    }
}