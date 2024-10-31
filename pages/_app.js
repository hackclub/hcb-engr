import * as React from 'react'
import NextApp from 'next/app'

import '../styles/font.css';
import theme from '@hackclub/theme'
import { ThemeProvider } from 'theme-ui'
import '../styles/global.css';


export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
