import { Auth } from '@supabase/ui'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { supabase } from '../utils/supabaseClient'
import App from "next/app";
import Link from 'next/link'
import { NextPage } from 'next';
import "../styles/tailwind.css";
import React from 'react';
import Head from 'next/head';

export default class MyApp extends App {

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    // todo: fix type error here
    // @ts-ignore
    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Hiemdallr : Dev Playgroud</title>
      </Head>
      <Layout>
        <Auth.UserContextProvider supabaseClient={supabase}>
          {typeof window === 'undefined' ? null : <Component {...pageProps} />}
        </Auth.UserContextProvider>
      </Layout>
    </React.Fragment>
  }
}