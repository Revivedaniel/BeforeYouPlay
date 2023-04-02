import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import './style.css'
import { useState } from 'react'
import Header from '@/components/Header'
import Login from "../components/Login";
import Signup from "../components/SignUp";

interface State {
  login: boolean;
  signUp: boolean;
}

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  const [state, setState] = useState<State>({ login: false, signUp: false });
  const { login, signUp } = state;
  return (
    <ApolloProvider client={apolloClient}>
      <Header setLogin={() => setState((prev) => ({ ...prev, login: true }))} setSignUp={() => setState((prev) => ({ ...prev, signUp: true }))} />
      {login && (
        <Login setLogin={() => setState((prev) => ({ ...prev, login: false }))} />
      )}
      {signUp && (
        <Signup setSignUp={() => setState((prev) => ({ ...prev, signUp: false }))} />
      )}
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
