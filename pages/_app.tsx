import { ErrorInfo } from "react"
import styled, { createGlobalStyle } from "styled-components"
import Head from "next/head"
import { AppProps } from "next/app"

import { ErrorBoundary } from "helpers/bugsnag"

const FONT =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"

const GlobalStyle = createGlobalStyle`
  html,
  body {
    font-family: ${FONT};
  }

  input,
  button {
    font-family: ${FONT};
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`

const ErrorContainer = styled.div`
  font-family: ${FONT};
  padding: 2em 1em;
  h1 {
    color: #e10f14;
  }
  code {
    display: block;
    margin-top: 8em;
    color: #aaa;
  }
`

// https://github.com/bugsnag/bugsnag-js/blob/next/packages/plugin-react/types/bugsnag-plugin-react.d.ts
interface FallbackProps {
  error: Error
  info: ErrorInfo
  clearError: () => void
}

const ErrorComponent = ({ error }: FallbackProps) => (
  <ErrorContainer>
    <h1>
      <span aria-hidden>🐞</span>
      <br />
      An error happened
    </h1>
    <h2>Try reloading the page</h2>
    <code>{String(error)}</code>
  </ErrorContainer>
)

export default function MyApp({ Component, pageProps }: AppProps) {
  const children = (
    <>
      <GlobalStyle />
      <Head>
        <title>Participation | La Chouette Coop</title>
        <link rel="icon" href="/favicon32.png" type="image/png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no" />
      </Head>
      <Component {...pageProps} />
    </>
  )

  return ErrorBoundary ? <ErrorBoundary FallbackComponent={ErrorComponent}>{children}</ErrorBoundary> : children
}
