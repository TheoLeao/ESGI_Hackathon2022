
import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { user } from '../../../src/api/api';
import { me } from '../../../src/api/api';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react'

import DashboardLayout from '../../../src/layouts/DashboardLayout/DashboardLayout';
import Lottie from "react-lottie";
import loader from "../../../src/lotties/loader.json";

const User = ({ Component, pageProps }) => {
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [infoUser, setUsersList] = useState([]);

    useEffect(async () => {
        let id = await me();
        let value = await user(id.id);
        setUsersList(value);
        setIsDataLoading(false);
    }, [])

    return (
        <>
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
                <> <div className={`${styles.info} `}>
                    <Heading mb={10}> Profile de {infoUser.name}</Heading>
                    <Table variant='simple' className={styles.table}>
                        <Tbody>
                            <Tr>
                                <Td>Nom </Td>
                                <Td>{infoUser.name}</Td>
                            </Tr>
                            <Tr>
                                <Td>Téléphone</Td>
                                <Td>{infoUser.phone}</Td>
                            </Tr>
                            <Tr>
                                <Td>Email</Td>
                                <Td>{infoUser.email}</Td>
                            </Tr>
                            <Tr>
                                <Td>Date de naissance</Td>
                                <Td>{infoUser.birth}</Td>
                            </Tr>
                            <Tr>
                                <Td>Taille</Td>
                                <Td>{infoUser.size}</Td>
                            </Tr>
                            <Tr>
                                <Td>Poids</Td>
                                <Td>{infoUser.weight}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </div>

                    <div className={`${styles.address} `}>
                        <Heading mb={10} mt={28}> Adresse</Heading>
                        <Table variant='simple' className={styles.table}>
                            <Tbody>
                                <Tr>
                                    <Td>Rue</Td>
                                    <Td>{infoUser?.address?.street}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Ville</Td>
                                    <Td>{infoUser?.address?.city}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Code postal</Td>
                                    <Td>{infoUser?.address?.zipcode}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Pays</Td>
                                    <Td>{infoUser?.address?.country}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </div></>
            </div>}

        </>

    )
}

User.getLayout = function getLayout(User) {
    return <DashboardLayout>{User}</DashboardLayout>
}

export default User;