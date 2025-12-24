import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Box, Container, Flex, Heading, useColorMode } from 'theme-ui'

function currentAmount(startTime, untilYesterday, lastDay) {
    const elapsed = Date.now() - startTime;
    const fullDay = 1000 * 60 * 60 * 24;
    const additional = elapsed / fullDay * lastDay;

    return untilYesterday + additional;
}

export default function Counter({ untilYesterday, lastDay, startTime, initialValue }) {
    const [transactionAmount, setTransactionAmount] = useState(initialValue);

    useEffect(() => {
        const interval = setInterval(() => {
            setTransactionAmount(currentAmount(startTime, untilYesterday, lastDay));
        }, 50);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <Head>
                <title>Counter</title>
            </Head>
            <Header />
            <Box as="main" sx={{ color: 'text' }}>
                <Container
                    as="article"
                    variant="wide"
                    sx={{ pt: 3, pb: [3, 4], minHeight: 'calc(100vh - 200px)', px: "82px" }}
                >
                    <Heading as="h1" variant="headline">Total Transaction Volume (24h delay)</Heading>

                    <Heading as="h2" variant="headline">{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(transactionAmount / 100)}</Heading>

                </Container>
            </Box>
            <Footer />

        </>
    )
}

export async function getServerSideProps() {
    // const stats = await fetch("https://hcb.hackclub.com/stats").then(res => res.json());

    // const total = stats.all.transactions_volume;
    // const lastDay = stats.last_day.transactions_volume;

    const total = 3857174281;
    const lastDay = 11919761;
    const date = "2025-01-14T19:23:07.650+00:00";

    const untilYesterday = total - lastDay;
    const startTime = new Date(date).getTime();

    return {
        props: {
            untilYesterday,
            lastDay,
            startTime,
            initialValue: currentAmount(startTime, untilYesterday, lastDay)
        }
    }
}