import styles from './index.module.scss';
import DashboardLayout from '../../../src/layouts/DashboardLayout/DashboardLayout';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Text,
    Button, Heading, Container, Stack, Badge
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const Campain = ({ Component, pageProps }) => {
    const router = useRouter()
    const { pid } = router.query;
    // let campain = {
    //     "id": 1,
    //     "name": "Campagne de test sur les crêmes pour la peau",
    //     "description": "Cette campagne a été créee dans le but de tester scientifiquement les conséquences d'une application quotidienne des crêmes de peau",
    //     "state": 0,
    //     "products": [{
    //         "id": 1,
    //         "name": "Crême peau sensible",
    //         "mark": "Nivea",
    //         "code": "1234123F",
    //         "category": "cream"
    //     },
    //     {
    //         "id": 2,
    //         "name": "Crême toutt ype de peau",
    //         "mark": "Nivea",
    //         "code": "1234123F",
    //         "category": "cream"
    //     }],
    //     "sessions": [{
    //         "id": 1,
    //         "name": "Placebo",
    //         "startDate": "01/02/22",
    //         "endDate": "31/04/22"
    //     },
    //     {
    //         "id": 2,
    //         "name": "Produit véritable",
    //         "startDate": "01/01/22",
    //         "endDate": "31/09/22"
    //     }
    //     ]
    // };

    const campaign = useSelector((state) => state.campaigns.find((campaign) => campaign.id == pid));
    const sessions = useSelector((state) => state.campaigns.find((campaign) => campaign.id == pid)?.sessions);
    return (
        <>
            <Heading as='h3' size='lg'>Détail de la campagne  {campaign?.state ? <Badge colorScheme='green'>Ouverte</Badge> : <Badge colorScheme='red'>Fermé</Badge>}</Heading>


            <div className={styles.content}>
                <div className={`${styles.section} `}>
                    <Heading as='h4' size='md'>Description de la campagne</Heading>
                    <Container maxW='container.lg' className={styles.containerComponent}>
                        {campaign?.description}
                    </Container>
                </div>
                <div className={`${styles.section} `}>
                    <Heading as='h4' size='md'>Liste des produits</Heading>
                    <Container maxW='container.lg' className={styles.containerComponent}>
                        <Table variant='simple' className={styles.table}>
                            <Thead>
                                <Tr>
                                    <Th>Nom</Th>
                                    <Th>Marque</Th>
                                    <Th>Code</Th>
                                    <Th>Catégorie</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {campaign?.products.map((product) => {
                                    return <Tr>
                                        <Td>{product.name}</Td>
                                        <Td>{product.mark}</Td>
                                        <Td>{product.code}</Td>
                                        <Td>{product.category}</Td>
                                    </Tr>
                                })}
                            </Tbody>
                        </Table>
                    </Container>
                </div>
                <div className={`${styles.section} `}>
                    <Heading as='h4' size='md'>Liste des sessions ouvertes</Heading>
                    <Container maxW='container.lg' className={styles.containerComponent}>
                        <Table variant='simple' className={styles.table}>
                            <Thead>
                                <Tr>
                                    <Th>Nom</Th>
                                    <Th>Description</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {campaign?.sessions.map((session) => {
                                    return <Tr>
                                        <Td>{session.label}</Td>
                                        <Td>{session.description}</Td>
                                    </Tr>
                                })}
                            </Tbody>
                        </Table>
                    </Container>
                </div>

            </div>

        </>


    )
}

Campain.getLayout = function getLayout(Campain) {
    return <DashboardLayout>{Campain}</DashboardLayout>
}

export default Campain;