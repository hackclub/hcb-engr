import * as React from 'react'
import NextApp from 'next/app'

import '../styles/font.css'
import theme from '@hackclub/theme'
import { ThemeProvider } from 'theme-ui'
import '../styles/global.css'
import Head from 'next/head'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <meta
            property="og:image"
            content="https://bank.engineering/og-v1.png"
          />
          <link rel="icon" href="/favicon.png" />
          <link rel="shortcut icon" href="/favicon.png" />
          <link rel="favicon" href="/favicon.png" />
          <script defer data-domain="bank.engineering" src="https://plausible.io/js/script.js"></script>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
