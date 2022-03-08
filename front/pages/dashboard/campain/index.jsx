import Head from 'next/head'
import Image from 'next/image'
import styles from './index.module.scss';
import { Container } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import Link from 'next/link';


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
    Button, Stack
} from '@chakra-ui/react'

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
        <>
            <Heading as='h3' size='lg'>Les campagnes</Heading>
            <Table variant='simple' className={styles.table}>
                <Thead>
                    <Tr>
                        <Th>Nom</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>

                    {campains.map((campain) => {
                        return <Tr>
                            <Td>{campain.name}</Td>
                            <Td>
                                <Stack spacing={2} direction='row' align='center'>
                                    <Button colorScheme='teal' size='sm'>Postuler</Button>
                                    <Link href={'/dashboard/campain/' + campain.id}>
                                        <Button colorScheme='teal' size='sm'>Voir</Button>
                                    </Link>
                                </Stack>
                            </Td>
                        </Tr>
                    })}
                </Tbody>
            </Table>
        </>


    )
}

Campain.getLayout = function getLayout(Campain) {
    return <DashboardLayout>{Campain}</DashboardLayout>
}

export default Campain;