import { Auth } from '@supabase/ui'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { supabase } from '../utils/supabaseClient'
import App from "next/app";
import Link from 'next/link'
import { NextPage } from 'next';
import "../styles/tailwind.css";
import React from 'react';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={'dark'}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </main>
  )
}