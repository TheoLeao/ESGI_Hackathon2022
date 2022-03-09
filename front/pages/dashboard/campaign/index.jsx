import Head from 'next/head'
import Image from 'next/image'
import styles from './index.module.scss';
import { Container } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import DashboardLayout from '../../../src/layouts/DashboardLayout/DashboardLayout';
import {
    Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption,
    Stack, Text, Box, VStack,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    FormControl, FormLabel, Input, Button, Textarea, FormErrorMessage
} from '@chakra-ui/react';
import { FiPlusCircle } from 'react-icons/fi';
import { useDisclosure } from '@chakra-ui/react';
import { useFormik, Formik } from 'formik';
import theme from '../../../src/theme/theme';
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { addCampaign, removeCampaign, test } from '../../../src/store/features/campaign/campaignSlice';
const Modal_CreateCampaign = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef()
    const initialValues = {
        campaign_name: "",
        campaign_description: "",
    };
    const validationSchema = Yup.object({
        campaign_name: Yup.string().required('Le nom de la compagne est requis'),
        campaign_description: Yup.string().required('La description de la campagne est requise')
    });
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema:  validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            dispatch(addCampaign({id: 1, name: values.campaign_name, description: values.campaign_description}));
            dispatch(removeCampaign({id: 1}));

        },
    })
    return (
        <>
            <Button onClick={onOpen} colorScheme='teal' size='sm' leftIcon={<FiPlusCircle />}>Créer une campagne</Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Créer une campagne</ModalHeader>
                    <ModalCloseButton />
                    <VStack as="form" onSubmit={formik.handleSubmit}>
                        <ModalBody pb={6} w="100%">
                            <FormControl>
                                <FormLabel>Nom de la campagne</FormLabel>
                                <Input id="campaign_name" name="campaign_name" onChange={formik.handleChange} value={formik.values.campaign_name} ref={initialRef} placeholder='Nom de la campagne' />
                                {formik.errors.campaign_name ? <Text fontSize='sm' color={theme.colors.danger.normal}>{formik.errors.campaign_name}</Text> : null}
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Description de la campagne</FormLabel>
                                <Textarea id="campaign_description" name="campaign_description" onChange={formik.handleChange} value={formik.values.campaign_description} placeholder='Description de la campagne' />
                                {formik.errors.campaign_description ? <Text fontSize='sm' color={theme.colors.danger.normal}>{formik.errors.campaign_description}</Text> : null}
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type='submit'>
                                Créer
                            </Button>
                            <Button onClick={onClose}>Annuler</Button>
                        </ModalFooter>
                    </VStack>


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
            
            <div className={styles.heading}>
                <Heading as='h3' size='lg'>Les campagnes</Heading>
                <Modal_CreateCampaign></Modal_CreateCampaign>
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