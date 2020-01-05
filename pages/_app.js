import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from 'styled-components';
import {
	StylesProvider,
	ThemeProvider as MuiThemeProvider
} from '@material-ui/core/styles';

import theme from '@utils/theme';
import Layout from '@components/layout';


export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    // The client side is straightforward. All we need to do is remove the server-side generated CSS
    // https://material-ui.com/guides/server-rendering/#the-client-side
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head><title>MSA shop</title></Head>

        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </StylesProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </>
    );
  }
}