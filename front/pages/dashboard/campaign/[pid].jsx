import styles from "./index.module.scss";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Heading, Container, Badge } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useQuery from "../../../src/hooks/useQuery";
import { getCampaignById, me, getSessionUser2 } from "../../../src/api/api";

const Campain = ({ Component, pageProps }) => {
    const role = null;
    if (typeof window !== "undefined") {
        role = sessionStorage.getItem("role");
    }
    const query = useQuery();
    const [campaign, setCampaigns] = useState([]);
    const [userSession, setUserSession] = useState([]);
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
        console.log(userSession.id);
    }, [query]);

    return (
        <>
            <Heading as="h3" size="lg">
                Détail de la campagne{" "}
                {campaign?.state ? <Badge colorScheme="green">Ouverte</Badge> : <Badge colorScheme="red">Fermé</Badge>}
            </Heading>
            <div className={styles.content}>
                <div className={`${styles.section} `}>
                    <Heading as="h4" size="md">
                        Description de la campagne
                    </Heading>
                    <Container maxW="container.lg" className={styles.containerComponent}>
                        {campaign?.description}
                    </Container>
                </div>
                <div className={`${styles.section} `}>
                    <Heading as="h4" size="md">
                        Produit: {campaign?.product?.name}
                    </Heading>
                    <Container maxW="container.lg" className={styles.containerComponent}>
                        <Table variant="simple" className={styles.table}>
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
                                    <Td>
                                        <img src={campaign?.product?.picture} />
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Container>
                </div>
                {role != "tester" && (
                    <div className={`${styles.section} `}>
                        <Heading as="h4" size="md">
                            Liste des sessions
                        </Heading>
                        <Link href={"/dashboard/requests/" + campaign?.id}>
                            <Button colorScheme="teal" size="sm" mt={3}>
                                Demandes
                            </Button>
                        </Link>
                        <Container maxW="container.lg" className={styles.containerComponent}>
                            <Table variant="simple" className={styles.table}>
                                <Thead>
                                    <Tr>
                                        <Th>Nom</Th>
                                        <Th>Description</Th>
                                        <Th>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {campaign?.sessions?.map((session) => {
                                        return (
                                            <Tr>
                                                <Td>{session.name}</Td>
                                                <Td>{session.description}</Td>
                                                <Td>
                                                    <Link href={"/dashboard/resultQcm/" + session.id}>
                                                        <Button colorScheme="teal" size="sm">
                                                            Statistiques
                                                        </Button>
                                                    </Link>
                                                    <Link href={"/dashboard/userSession/" + session.id}>
                                                        <Button ml={5} colorScheme="teal" size="sm">
                                                            Testeurs
                                                        </Button>
                                                    </Link>
                                                </Td>
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                        </Container>
                    </div>
                )}
                {/* })}
                            </Tbody>
                        </Table>
                    </Container>
                </div>
            } */}

                {role != "admin" && userSession.id != null && (
                    <Link href={"/dashboard/qcm/" + userSession.session_id}>
                        <Button ml={5} mt={20} maxW="200" colorScheme="teal" size="sm">
                            Accéder au questionnaire
                        </Button>
                    </Link>
                )}
            </div>
        </>
    );
};

Campain.getLayout = function getLayout(Campain) {
    return <DashboardLayout>{Campain}</DashboardLayout>;
};

export default Campain;
