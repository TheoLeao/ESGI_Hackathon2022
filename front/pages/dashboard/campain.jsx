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

const Campain = ({ Component, pageProps }) => {


    let campains = [{
        "id": 1,
        "name": "Campagne de test sur les crêmes pour la peau",
        "products": [{
            "id": 1,
            "name": "Crême peau sensible",
            "mark": "Nivea",
            "code": "1234123F",
            "state": "comingsoon", //"coming-soon", "passed" ou "in-progress"
            "category": "cream"
        }],
        "sessions": [{
            "id": 1,
            "label": "Placebo"
        },
        {
            "id": 1,
            "label": "Placebo"
        }
        ]
    }];
    return (
        <h1>Content campain</h1>
        
    )
}

Campain.getLayout = function getLayout(Campain) {
    return <DashboardLayout>{Campain}</DashboardLayout>
}

export default Campain;