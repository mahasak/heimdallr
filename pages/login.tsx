type Props = {
  layout: React.ReactElement
}

import AuthLayout from "../layouts/AuthLayout";
import Link from 'next/link'
import useSWR from 'swr'
import { Auth, Card, Typography, Space, Button, Icon } from '@supabase/ui'
import { supabase } from '../utils/supabaseClient'
import { useEffect, useState } from 'react'
import Router from 'next/router'

declare type ViewType = 'sign_in' | 'sign_up' | 'forgotten_password' | 'magic_link' | 'update_password';
const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

const Login = () => {
  const { user, session } = Auth.useUser()
  const { data, error } = useSWR(session ? ['/api/getUser', session.access_token] : null, fetcher)
  const [authView, setAuthView] = useState<ViewType>('sign_in')

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') setAuthView('forgotten_password')
      if (event === 'USER_UPDATED') setTimeout(() => setAuthView('sign_in'), 1000)
      // Send session to /api/auth route to set the auth cookie.
      // NOTE: this is only needed if you're doing SSR (getServerSideProps)!

      fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      }).then((res) => {
        return res.json()
      })
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  const View = () => {
    if (!user || user === null || user === undefined)
      return (
        <Space direction="vertical" size={8}>
          <div>
            <img src="https://app.supabase.io/img/supabase-dark.svg" width="96" />
            <Typography.Title level={3}>Welcome to Supabase Auth</Typography.Title>
          </div>
          <Auth
            supabaseClient={supabase}
            providers={['google', 'github']}
            view={authView}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
            redirectTo="http://localhost:3000/protected"
          />
        </Space>
      )
    Router.push('/protected')
    return (
      <Space direction="vertical" size={6}>
        {authView === 'forgotten_password' && <Auth.UpdatePassword supabaseClient={supabase} />}
        {user && (
          <>
            <Typography.Text>You're signed in</Typography.Text>
            <Typography.Text strong>Email: {user.email}</Typography.Text>
            {error && <Typography.Text type="danger">Failed to fetch user!</Typography.Text>}
            <div>Redirecting...</div>
          </>
        )}
      </Space>
    )
  }

  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <Card>
        <View />
      </Card>
    </div>
  )
}

Login.layout = AuthLayout;

export default Login;