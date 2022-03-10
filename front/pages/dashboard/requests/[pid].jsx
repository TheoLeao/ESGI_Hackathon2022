import { Heading, Select, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
import { acceptUserIntoSession, requests as getRequests } from "../../../src/api/api";

import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";

const UsersList = ({ Component, pageProps }) => {
    const [requests, setRequests] = useState([]);
    const toast = useToast();
    const router = useRouter();
    const toastIdRef = useRef();

    useEffect(async () => {
        if (false === router.isReady) {
            return;
        }
        const { pid } = router.query;
        setRequests(await getRequests(pid));
    }, [router.isReady]);

    const handleAcceptRequest = async (e, userId) => {
        const sessionId = e.target.value;
        if (!sessionId) {
            return;
        }

        try {
            const rep = await acceptUserIntoSession(sessionId, userId);
            if (rep["alreadyExist"]) {
                toastIdRef.current = toast({
                    title: "Utilisateur déjà associé à la session",
                    status: "info",
                    duration: 9000,
                    isClosable: true,
                });
                return;
            }

            toastIdRef.current = toast({
                title: "Ajout à la session réussi",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            // TODO better
            setRequests({ campaign: requests.campaign, users: requests.users?.filter((u) => u.id !== userId) });
        } catch {
            toastIdRef.current = toast({
                title: "Echec de l'enregistrement des données",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            {requests && (
                <>
                    <Heading mb={10}>Liste des demandes</Heading>
                    <Table variant="simple" className={styles.table}>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Name</Th>
                                <Th>Tel</Th>
                                <Th>Mail</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        {requests.users?.length > 0 ? <Tbody>
                            {requests.users?.map((user) => {
                                return (
                                    <Tr key={user}>
                                        <Td>{user.id}</Td>
                                        <Td>{user.name}</Td>
                                        <Td>{user.phone}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>
                                            <Select
                                                onChange={(e) => handleAcceptRequest(e, user.id)}
                                                placeholder="Select session"
                                            >
                                                {requests.campaign?.sessions?.map((s) => {
                                                    return <option value={s.id}>{s.name}</option>;
                                                })}
                                            </Select>
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody> : <div className={styles.message}>Aucune demande pour cette campagne 😅</div>}
                        
                    </Table>
                </>
            )}
        </>
    );
};

UsersList.getLayout = function getLayout(UsersList) {
    return <DashboardLayout>{UsersList}</DashboardLayout>;
};

export default UsersList;
