import '@styles/globals.scss'

function MyApp({ Component, pageProps }: { Component: React.ComponentType, pageProps: any }) {
  return <Component {...pageProps} />
}

export default MyApp