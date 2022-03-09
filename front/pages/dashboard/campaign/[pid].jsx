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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCampaignById } from '../../../src/api/api';
import useQuery from '../../../src/hooks/useQuery';


const Campain = ({ Component, pageProps }) => {
    const query = useQuery();
    const [campaign, setCampaigns] = useState([]);
    useEffect(async () => {
        if (!query) {
            return;
        }
        const { pid } = query;
        let campaign_data = await getCampaignById(pid);
        setCampaigns(campaign_data);
    }, []);
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
                    <Heading as='h4' size='md'>Produit: {campaign?.product?.name}</Heading>
                    <Container maxW='container.lg' className={styles.containerComponent}>
                        <Table variant='simple' className={styles.table}>
                            <Thead>
                                <Tr>
                                    <Th>Marque</Th>
                                    <Th>Code</Th>
                                    <Th>Catégorie</Th>
                                    <Th>Photo</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>{campaign?.product?.brand}</Td>
                                    <Td>{campaign?.product?.code_product}</Td>
                                    <Td>{campaign?.product?.category}</Td>
                                    <Td></Td>
                                </Tr>

                            </Tbody>
                        </Table>
                    </Container>
                </div>
                <div className={`${styles.section} `}>
                    <Heading as='h4' size='md'>Liste des sessions</Heading>
                    <Container maxW='container.lg' className={styles.containerComponent}>
                        <Table variant='simple' className={styles.table}>
                            <Thead>
                                <Tr>
                                    <Th>Nom</Th>
                                    <Th>Description</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {campaign?.sessions?.map((session) => {
                                    return <Tr>
                                        <Td>{session.name}</Td>
                                        <Td>{session.description}</Td>
                                        <Td>
                                            <Link href={'/dashboard/resultQcm/' + session.id}>
                                            <Button colorScheme='teal' size='sm'>Statistiques</Button>
                                            </Link>
                                        </Td>
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