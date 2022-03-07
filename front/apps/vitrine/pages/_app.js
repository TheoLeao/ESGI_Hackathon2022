import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react'
import './styles.css';
function CustomApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider>
        <Head>
          <title>Welcome to vitrine!</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>

      </ChakraProvider>
    </>
  );
}
export default CustomApp;
