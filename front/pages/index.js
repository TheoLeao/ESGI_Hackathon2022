import Head from 'next/head'
import Image from 'next/image'
import CallToActionWithVideo from '../src/components/CallToActionWithVideo/CallToActionWithVideo'
import Navbar from '../src/components/Navbar/Navbar';
import styles from '../styles/pages/index.module.scss';
import Features from '../src/components/Features/Features';
import Story from '../src/components/Story/Story';
import Beliefs from '../src/components/Beliefs/Beliefs';
import Footer from '../src/components/Footer/Footer';
import ButtonBottom from '../src/components/ButtonBottom/ButtonBottom';
import SimpleThreeColumns from '../src/components/SimpleThreeColumns/SimpleThreeColumns';
import CallToActionWithAnnotation from '../src/components/CallToActionWithAnnotation/CallToActionWithAnnotation';
import { Container } from '@chakra-ui/react';
export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar></Navbar>
            <Container maxW={'3xl'}>
                <CallToActionWithAnnotation></CallToActionWithAnnotation>
            </Container>
            <Container maxW={'5xl'}>
                <Features></Features>
            </Container>
            <Container maxW={'5xl'}>
                <Story></Story>
            </Container>
            <Container maxW={'5xl'}>
                <Beliefs></Beliefs>
            </Container>
            <Container maxW={'5xl'}>
                <SimpleThreeColumns></SimpleThreeColumns>
            </Container>
            <Container maxW={'5xl'}>
                <ButtonBottom></ButtonBottom>
            </Container>
            <Container maxW={'5xl'}>
                <Footer></Footer>
            </Container>

        </div>
    )
}
