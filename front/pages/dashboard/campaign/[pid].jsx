import { Badge, Button, Container, Heading, Table, Tbody, Td, Th, Thead, Tr, Text, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Lottie from "react-lottie";
import { getCampaignById, getSessionUser2, me, request } from '../../../src/api/api';
import useQuery from '../../../src/hooks/useQuery';
import DashboardLayout from '../../../src/layouts/DashboardLayout/DashboardLayout';
import loader from "../../../src/lotties/loader.json";
import styles from './index.module.scss';
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";
const Campain = ({ Component, pageProps }) => {
    const router = useRouter();
    const role = null;
    if (typeof window !== "undefined") {
        role = sessionStorage.getItem("role");
    }
    const [isDataLoading, setIsDataLoading] = useState(true);
    const query = useQuery();
    const [campaign, setCampaigns] = useState([]);
    const [userSession, setUserSession] = useState([]);
    const toast = useToast();
    const toastIdRef = useRef();
    const campaigns = useSelector((state) => state.campaigns);
    useEffect(async () => {
        if (!query) {
            return;
        }
        const { pid } = query;
        let campaign_data = await getCampaignById(pid);
        setCampaigns(campaign_data);
        let userInfo = await me();
        let userSession = await getSessionUser2(pid);
        setUserSession(userSession);
        setIsDataLoading(false)
    }, [query]);

    async function handlePostuler(campaignId) {
        console.log(campaignId)
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
            <div className={styles.container}>
                {isDataLoading ? <div className={styles.loader}>
                    <Lottie
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

                    />
                </div> : <div className={styles.fadeinContent}>
                    <Button style={{marginBottom: '10px'}} leftIcon={<FiArrowLeft />} colorScheme='grey' variant='outline' size='xs' onClick={() => router.back()}>
                        Retour
                    </Button>
                    <Heading as='h3' size='lg'>Détail de la campagne  {campaign?.state ? <Badge colorScheme='green'>Ouverte</Badge> : <Badge colorScheme='red'>Fermé</Badge>}</Heading>
                    <div className={styles.content}>
                        <div className={`${styles.section} `}>
                            <Heading as='h4' size='md'>Description de la campagne</Heading>
                            <Container maxW='container' className={styles.containerComponent}>
                                {campaign?.description}
                            </Container>
                        </div>
                        <div className={`${styles.section} `}>
                        {role == 'tester' && <Button
                            colorScheme="teal"
                            size="sm"
                            onClick={() => handlePostuler(campaign.id)}
                            >Postuler</Button>}
                        </div>
                        <div className={`${styles.section} `}>
                            <Heading as='h4' size='md'>Produit: {campaign?.product?.name}</Heading>
                            
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
                                            <Td><img style={{ maxHeight: '200px' }} src={campaign?.product?.picture}></img></Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            
                        </div>
                        {role != 'tester' &&
                            <div className={`${styles.section} `}>
                                <Heading as='h4' size='md'>Liste des sessions</Heading>
                                <Link href={'/dashboard/requests/' + campaign?.id}>
                                    <Button colorScheme='teal' size='sm' mt={3}>Demandes</Button>
                                </Link>
                                <Container maxW='container' className={styles.containerComponent}>
                                    <Table variant='simple' className={styles.table}>
                                        <Thead>
                                            <Tr>
                                                <Th>Nom</Th>
                                                <Th>Description</Th>
                                                <Th>Action</Th>
                                            </Tr>
                                        </Thead>
                                        {campaign.sessions.length > 0 ?
                                            <Tbody>
                                                {campaign?.sessions?.map((session) => {
                                                    return <Tr>
                                                        <Td>{session.name}</Td>
                                                        <Td>{session.description}</Td>
                                                        <Td>
                                                            <Link href={'/dashboard/resultQcm/' + session.id}>
                                                                <Button colorScheme='teal' size='sm'>Statistiques</Button>
                                                            </Link>
                                                            <Link href={'/dashboard/userSession/' + session.id}>
                                                                <Button ml={5} colorScheme='teal' size='sm'>Testeurs</Button>
                                                            </Link>
                                                            <Link href={'/dashboard/qcm/' + session.id}>
                                                                <Button ml={5} colorScheme='teal' size='sm'>Accéder au questionnaire</Button>
                                                            </Link>
                                                        </Td>
                                                    </Tr>
                                                })}
                                            </Tbody>
                                            : <div className={styles.message}>Aucune session pour cette campagne 😅</div>}

                                    </Table>
                                </Container>
                            </div>
                        }

                        {role != 'admin' && userSession.id != null &&
                            <Link href={'/dashboard/qcm/' + userSession.session_id}>
                                <Button ml={5} mt={20} maxW='200' colorScheme='teal' size='sm'>Accéder au questionnaire</Button>
                            </Link>
                        }


                    </div>




                </div>
                }
            </div>
        </>
    );
};

Campain.getLayout = function getLayout(Campain) {
    return <DashboardLayout>{Campain}</DashboardLayout>;
};

export default Campain;
