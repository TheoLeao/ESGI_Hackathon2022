import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.scss";
import { Container, useToast } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Stack,
    Text,
    Box,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    Textarea,
    FormErrorMessage,
} from "@chakra-ui/react";
import { FiPlusCircle } from "react-icons/fi";
import { useDisclosure } from "@chakra-ui/react";
import { useFormik, Formik } from "formik";
import theme from "../../../src/theme/theme";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
    addCampaign,
    createSessionCampaign,
    removeCampaign,
    initCampaigns,
} from "../../../src/store/features/campaign/campaignSlice";
import Lottie from "react-lottie";
import loader from "../../../src/lotties/loader.json";
import { getCampaigns, createCampaign, createSession, uploadSurvey, request } from "../../../src/api/api";
import { Form } from "react-bootstrap";

const Modal_CreateCampaign = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef();
    const initialValues = {
        campaign_name: "",
        campaign_description: "",
        campaign_product_name: "",
        campaign_product_brand: "",
        campaign_product_code: "",
        campaign_product_category: "",
        campaign_product_picture: "",
        campaign_product_description: "",
    };
    const validationSchema = Yup.object({
        campaign_name: Yup.string().required("Le nom de la compagne est requis"),
        campaign_description: Yup.string().required("La description de la campagne est requise"),
        campaign_product_name: Yup.string().required("Le nom du produit est requis"),
        campaign_product_brand: Yup.string().required("La marque du produit est requise"),
        campaign_product_code: Yup.string().required("Le code du produit est requis"),
        campaign_product_category: Yup.string().required("La catégorie du produit est requise"),
        campaign_product_description: Yup.string().required("La description du produit est requise"),
    });

    const processFile = (file) => {
        const reader = new FileReader();

        return new Promise((resolve, _) => {
            reader.onloadend = () => {
                console.log("aaa");
                resolve(reader.result);
            };
            reader.readAsDataURL(file);
        });
    };

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));
            const file = document.querySelector('input[name="campaign_product_photo"]').files[0];

            reader.readAsDataURL(file);
            let result = await createCampaign({
                campaign_name: values.campaign_name,
                campaign_state: 1,
                campaign_description: values.campaign_description,
                product_name: values.campaign_product_name,
                product_brand: values.campaign_product_brand,
                product_code: values.campaign_product_code,
                product_category: values.campaign_product_category,
                product_picture: await processFile(file),
                product_description: values.campaign_product_description,
            });
            dispatch(
                addCampaign({
                    id: result.id,
                    name: result.name,
                    description: result.description,
                    state: parseInt(result.state),
                    campaign_product_name: result.product.name,
                    campaign_product_brand: result.product.brand,
                    campaign_product_code: result.product.code,
                    campaign_product_category: result.product.category,
                    campaign_product_description: result.product.description,
                })
            );

            onClose();
        },
    });
    return (
        <>
            <Button onClick={onOpen} colorScheme="teal" size="sm" leftIcon={<FiPlusCircle />}>
                Créer une campagne
            </Button>
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Créer une campagne</ModalHeader>
                    <ModalCloseButton />
                    <VStack as="form" onSubmit={formik.handleSubmit}>
                        <ModalBody pb={6} w="100%">
                            <Heading as="h4" size="md" style={{ marginBottom: "15px" }}>
                                La campagne
                            </Heading>
                            <div className={styles.line}>
                                <div className={styles.group}>
                                    <FormControl>
                                        <FormLabel>Nom de la campagne</FormLabel>
                                        <Input
                                            id="campaign_name"
                                            name="campaign_name"
                                            onChange={formik.handleChange}
                                            value={formik.values.campaign_name}
                                            ref={initialRef}
                                            placeholder="Nom de la campagne"
                                        />
                                        {formik.errors.campaign_name ? (
                                            <Text fontSize="sm" color={theme.colors.danger.normal}>
                                                {formik.errors.campaign_name}
                                            </Text>
                                        ) : null}
                                    </FormControl>
                                </div>
                                <div className={styles.group}>
                                    <FormControl>
                                        <FormLabel>Description de la campagne</FormLabel>
                                        <Textarea
                                            id="campaign_description"
                                            name="campaign_description"
                                            onChange={formik.handleChange}
                                            value={formik.values.campaign_description}
                                            placeholder="Description de la campagne"
                                        />
                                        {formik.errors.campaign_description ? (
                                            <Text fontSize="sm" color={theme.colors.danger.normal}>
                                                {formik.errors.campaign_description}
                                            </Text>
                                        ) : null}
                                    </FormControl>
                                </div>
                            </div>

                            <Heading as="h4" size="md" style={{ marginBottom: "15px" }}>
                                Le produit
                            </Heading>
                            <div className={styles.line}>
                                <div className={styles.group}>
                                    <FormControl>
                                        <FormLabel>Produit - Nom</FormLabel>
                                        <Input
                                            id="campaign_product_name"
                                            name="campaign_product_name"
                                            onChange={formik.handleChange}
                                            value={formik.values.campaign_product_name}
                                            ref={initialRef}
                                            placeholder="Nom du produit"
                                        />
                                        {formik.errors.campaign_product_name ? (
                                            <Text fontSize="sm" color={theme.colors.danger.normal}>
                                                {formik.errors.campaign_product_name}
                                            </Text>
                                        ) : null}
                                    </FormControl>
                                </div>
                                <div className={styles.group}>
                                    <FormControl>
                                        <FormLabel>Produit - Marque</FormLabel>
                                        <Input
                                            id="campaign_product_brand"
                                            name="campaign_product_brand"
                                            onChange={formik.handleChange}
                                            value={formik.values.campaign_product_brand}
                                            ref={initialRef}
                                            placeholder="Marque du produit"
                                        />
                                        {formik.errors.campaign_product_brand ? (
                                            <Text fontSize="sm" color={theme.colors.danger.normal}>
                                                {formik.errors.campaign_product_brand}
                                            </Text>
                                        ) : null}
                                    </FormControl>
                                </div>
                            </div>

                            <div className={styles.line}>
                                <div className={styles.group}>
                                    <FormControl>
                                        <FormLabel>Produit - Code</FormLabel>
                                        <Input
                                            id="campaign_product_code"
                                            name="campaign_product_code"
                                            onChange={formik.handleChange}
                                            value={formik.values.campaign_product_code}
                                            ref={initialRef}
                                            placeholder="Code du produit"
                                        />
                                        {formik.errors.campaign_product_code ? (
                                            <Text fontSize="sm" color={theme.colors.danger.normal}>
                                                {formik.errors.campaign_product_code}
                                            </Text>
                                        ) : null}
                                    </FormControl>
                                </div>
                                <div className={styles.group}>
                                    <FormControl>
                                        <FormLabel>Produit - Catégorie</FormLabel>
                                        <Input
                                            id="campaign_product_category"
                                            name="campaign_product_category"
                                            onChange={formik.handleChange}
                                            value={formik.values.campaign_product_category}
                                            ref={initialRef}
                                            placeholder="Catégorie du produit"
                                        />
                                        {formik.errors.campaign_product_category ? (
                                            <Text fontSize="sm" color={theme.colors.danger.normal}>
                                                {formik.errors.campaign_product_category}
                                            </Text>
                                        ) : null}
                                    </FormControl>
                                </div>
                            </div>
                            <div className={styles.line}>
                                <div className={styles.group}>
                                    <FormControl>
                                        <FormLabel>Produit - Description</FormLabel>
                                        <Textarea
                                            id="campaign_product_description"
                                            name="campaign_product_description"
                                            onChange={formik.handleChange}
                                            value={formik.values.campaign_product_description}
                                            placeholder="Description de la campagne"
                                        />
                                        {formik.errors.campaign_product_description ? (
                                            <Text fontSize="sm" color={theme.colors.danger.normal}>
                                                {formik.errors.campaign_product_description}
                                            </Text>
                                        ) : null}
                                    </FormControl>
                                </div>
                                <div className={styles.group}>
                                    <FormControl>
                                        <FormLabel>Produit - Photo</FormLabel>

                                        <Form.Control
                                            className={styles.inputDate}
                                            type="file"
                                            id="campaign_product_photo"
                                            name="campaign_product_photo"
                                            onChange={(event) => {
                                                formik.setFieldValue("file", event.currentTarget.files[0]);
                                            }}
                                        />
                                        {formik.errors.campaign_product_photo ? (
                                            <Text fontSize="sm" color={theme.colors.danger.normal}>
                                                {formik.errors.campaign_product_photo}
                                            </Text>
                                        ) : null}
                                    </FormControl>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit">
                                Créer
                            </Button>
                            <Button onClick={onClose}>Annuler</Button>
                        </ModalFooter>
                    </VStack>
                </ModalContent>
            </Modal>
        </>
    );
};

// const DateInput = () => {
//     const [value, setValue] = React.useState(null);

//     return (
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DatePicker
//                 label="Basic example"
//                 value={value}
//                 onChange={(newValue) => {
//                     setValue(newValue);
//                 }}
//                 renderInput={(params) => <TextField {...params} />}
//             />
//         </LocalizationProvider>
//     );
// }

const Modal_CreateSession = ({ campaignId }) => {
    const role = null;
    if (typeof window !== "undefined") {
        role = sessionStorage.getItem("role");
        if (role == "tester") {
            return "";
        }
    }
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef();
    const initialValues = {
        session_name: "",
        session_description: "",
        session_endDate: "",
        file: [],
    };

    const validationSchema = Yup.object({
        session_name: Yup.string().required("Le nom de la session est requis"),
        session_description: Yup.string().required("La description de la session est requise"),
        session_endDate: Yup.string().required("La date de fin de session est requise"),
        file: Yup.mixed().required("Fichier requis"),
    });

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));

            let result = await createSession({
                name: values.session_name,
                description: values.session_description,
                campaign_id: campaignId,
                date_end: values.session_endDate,
            });
            const file = document.querySelector('input[name="file"]').files[0];
            const result_file = await uploadSurvey(result.id, file);
            dispatch(
                createSessionCampaign({
                    id: result.id,
                    label: values.session_name,
                    description: values.session_description,
                    idCampaign: campaignId,
                })
            );

            onClose();
        },
    });
    return (
        <>
            <Button onClick={onOpen} colorScheme="teal" size="sm" leftIcon={<FiPlusCircle />}>
                Créer une session
            </Button>
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Créer une session</ModalHeader>
                    <ModalCloseButton />
                    <VStack as="form" onSubmit={formik.handleSubmit}>
                        <ModalBody pb={6} w="100%">
                            <FormControl>
                                <FormLabel>Nom de la session</FormLabel>
                                <Input
                                    id="session_name"
                                    name="session_name"
                                    onChange={formik.handleChange}
                                    value={formik.values.session_name}
                                    ref={initialRef}
                                    placeholder="Nom de la session"
                                />
                                {formik.errors.session_name ? (
                                    <Text fontSize="sm" color={theme.colors.danger.normal}>
                                        {formik.errors.session_name}
                                    </Text>
                                ) : null}
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Description de la session</FormLabel>
                                <Textarea
                                    id="session_description"
                                    name="session_description"
                                    onChange={formik.handleChange}
                                    value={formik.values.session_description}
                                    placeholder="Description de la session"
                                />
                                {formik.errors.session_description ? (
                                    <Text fontSize="sm" color={theme.colors.danger.normal}>
                                        {formik.errors.session_description}
                                    </Text>
                                ) : null}
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Date de fin de session</FormLabel>

                                <Form.Control
                                    className={styles.inputDate}
                                    type="date"
                                    id="session_endDate"
                                    name="session_endDate"
                                    onChange={formik.handleChange}
                                    value={formik.values.session_endDate}
                                />
                                {formik.errors.session_endDate ? (
                                    <Text fontSize="sm" color={theme.colors.danger.normal}>
                                        {formik.errors.session_endDate}
                                    </Text>
                                ) : null}
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Fichier de question</FormLabel>

                                <Form.Control
                                    className={styles.inputDate}
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={(event) => {
                                        formik.setFieldValue("file", event.currentTarget.files[0]);
                                    }}
                                />
                                {formik.errors.file ? (
                                    <Text fontSize="sm" color={theme.colors.danger.normal}>
                                        {formik.errors.file}
                                    </Text>
                                ) : null}
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit">
                                Créer
                            </Button>
                            <Button onClick={onClose}>Annuler</Button>
                        </ModalFooter>
                    </VStack>
                </ModalContent>
            </Modal>
        </>
    );
};

const Campaign = ({ Component, pageProps }) => {
    const dispatch = useDispatch();
    const toast = useToast();
    const toastIdRef = useRef();
    useEffect(async () => {
        let campaingns_data = await getCampaigns();
        dispatch(initCampaigns(campaingns_data));
    }, []);
    const campaigns = useSelector((state) => state.campaigns);

    async function handlePostuler(campaignId) {
        try {
            const rep = await request(campaignId);
            if (rep["alreadyExist"]) {
                toastIdRef.current = toast({
                    title: "Vous avez déjà candidaté",
                    status: "info",
                    duration: 9000,
                    isClosable: true,
                });
                return;
            }

            toastIdRef.current = toast({
                title: "Candidature réussite",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (e) {
            console.log(e);
            toastIdRef.current = toast({
                title: "Echec de l'enregistrement des données",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    return (
        <>
            {/* { <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: loader,
                    rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice"
                    }
                }}
                height={200}
                width={200}
            />} */}
            <div className={styles.heading}>
                <Heading as="h3" size="lg">
                    Les campagnes
                </Heading>
                <Modal_CreateCampaign></Modal_CreateCampaign>
            </div>
            <Table variant="simple" className={styles.table}>
                <Thead>
                    <Tr>
                        <Th>Nom</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {campaigns.map((campaign) => {
                        return (
                            <Tr>
                                <Td>{campaign.name}</Td>
                                <Td>
                                    <Stack spacing={2} direction="row" align="center">
                                        <Button
                                            colorScheme="teal"
                                            size="sm"
                                            onClick={() => handlePostuler(campaign.id)}
                                        >
                                            Postuler
                                        </Button>
                                        <Link href={"/dashboard/campaign/" + campaign.id}>
                                            <Button colorScheme="teal" size="sm">
                                                Voir
                                            </Button>
                                        </Link>
                                        <Modal_CreateSession campaignId={campaign.id}></Modal_CreateSession>
                                    </Stack>
                                </Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </>
    );
};

Campaign.getLayout = function getLayout(campaign) {
    return <DashboardLayout>{campaign}</DashboardLayout>;
};

export default Campaign;
