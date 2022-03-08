import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react';

const MyApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  console.log(getLayout)
  return <ChakraProvider>{getLayout(
    <Component {...pageProps} />
  )}</ChakraProvider>;

}

export default MyApp
