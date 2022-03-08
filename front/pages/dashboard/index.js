import Head from 'next/head'
import Image from 'next/image'
import CallToActionWithVideo from '../../src/components/CallToActionWithVideo/CallToActionWithVideo'
import Navbar from '../../src/components/Navbar/Navbar';
import styles from '../../styles/pages/dashboard.module.scss';
import Features from '../../src/components/Features/Features';
import CallToActionWithAnnotation from '../../src/components/CallToActionWithAnnotation/CallToActionWithAnnotation';
import { Container } from '@chakra-ui/react';
import Sidebar from '../../src/components/Sidebar/Sidebar';

import DashboardLayout from '../../src/layouts/DashboardLayout/DashboardLayout';

const Index = ({ Component, pageProps }) => {
    return (
        <h1>Content</h1>
    )
}

Index.getLayout = function getLayout(Index) {
    return <DashboardLayout>{Index}</DashboardLayout>
}

export default Index;