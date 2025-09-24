import * as React from 'react'
import NextApp from 'next/app'

import '../styles/font.css'
import theme from '@hackclub/theme'
import { ThemeProvider } from 'theme-ui'
import '../styles/global.css'
import Head from 'next/head'
import { QueryParamProvider } from 'use-query-params';
import NextAdapterApp from 'next-query-params/app';

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <QueryParamProvider adapter={NextAdapterApp}>
        <ThemeProvider theme={theme}>
          <Head>
            <link rel="icon" href="/favicon.png" />
            <link rel="shortcut icon" href="/favicon.png" />
            <link rel="favicon" href="/favicon.png" />
            <script defer data-domain="blog.hcb.hackclub.com" src="https://plausible.io/js/script.js"></script>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryParamProvider>
    )
  }
}
