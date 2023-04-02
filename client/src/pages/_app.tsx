import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import './style.css'
import { useState } from 'react'
import Header from '@/components/Header'
import Login from "../components/Login";
import Signup from "../components/SignUp";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  return (
    <ApolloProvider client={apolloClient}>
      <Header setLogin={setLogin} setSignUp={setSignUp} />
      {login && (
          <Login setLogin={setLogin}/>
        )}
        {signUp && (
          <Signup setSignUp={setSignUp}/>
        )}
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
