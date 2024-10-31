import * as React from 'react'
import NextApp from 'next/app'

import '../styles/font.css';
import theme from '@hackclub/theme'
import { ThemeProvider } from 'theme-ui'
import '../styles/global.css';
import Head from 'next/head';


export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <meta property="og:image" content="https://hackclub.com/og-v1.png" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
