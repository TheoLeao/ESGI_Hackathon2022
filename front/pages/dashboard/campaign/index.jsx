import Head from 'next/head'
import Image from 'next/image'
import styles from './index.module.scss';
import { Container } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';


import DashboardLayout from '../../../src/layouts/DashboardLayout/DashboardLayout';
import {
    Table, Thead, Tbody, Tfoot, Tr,Th,Td,TableCaption,
    Stack,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    FormControl, FormLabel,Input, Button, Textarea
} from '@chakra-ui/react';

import { FiPlusCircle } from 'react-icons/fi';

import { useDisclosure } from '@chakra-ui/react'

const Modal_CreateCampaign = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef()

    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>
   

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Créer une campagne</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nom de la campagne</FormLabel>
                            <Input id="campaign_name" ref={initialRef} placeholder='Nom de la campagne' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description de la campagne</FormLabel>
                            <Textarea id="campaign_description" placeholder='Description de la campagne' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Créer
                        </Button>
                        <Button onClick={onClose}>Annuler</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
const Campaign = ({ Component, pageProps }) => {
    let campaigns = [{
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
            <Modal_CreateCampaign></Modal_CreateCampaign>
            <div className={styles.heading}>
                <Heading as='h3' size='lg'>Les campagnes</Heading>
                <Button colorScheme='teal' size='sm' leftIcon={<FiPlusCircle />}>Créer une campagne</Button>
            </div>

            <Table variant='simple' className={styles.table}>
                <Thead>
                    <Tr>
                        <Th>Nom</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>

                    {campaigns.map((campaign) => {
                        return <Tr>
                            <Td>{campaign.name}</Td>
                            <Td>
                                <Stack spacing={2} direction='row' align='center'>
                                    <Button colorScheme='teal' size='sm'>Postuler</Button>
                                    <Link href={'/dashboard/campaign/' + campaign.id}>
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

Campaign.getLayout = function getLayout(campaign) {
    return <DashboardLayout>{campaign}</DashboardLayout>
}

export default Campaign;