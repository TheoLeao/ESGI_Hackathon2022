
import {Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import {user, users, getSessionUser} from '../../../src/api/api';
import { useRouter } from 'next/router';
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

const userSession = ({ Component, pageProps }) => {

    const router = useRouter();
    const { pid } = router.query;

    if (pid == undefined) {
        return null;
      }

    const [usersList, setUsersList] = useState([]);

        
        useEffect(async () => {

            let value = await getSessionUser(pid);
            setUsersList(value);

        }, [])
 
            return (
                
               <>
        
                <Heading mb={10}>Liste des testeurs de la session : {usersList.name}</Heading>
                <Table variant='simple' className={styles.table}>
                <Thead>
                    <Tr>
                        <Th>id</Th>
                        <Th>name</Th>
                        <Th>phone</Th>
                        <Th>mail</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Object.keys(usersList.users || []).map((user) => {
                        return <Tr key={user}>
                            <Td>{usersList.users[user].id}</Td>
                            <Td>{usersList.users[user].name}</Td>
                            <Td>{usersList.users[user].phone}</Td>
                            <Td>{usersList.users[user].email}</Td>
                        </Tr>
                    })}
            
                </Tbody>
            </Table>
</>
            
    )
}

userSession.getLayout = function getLayout(userSession) {
    return <DashboardLayout>{userSession}</DashboardLayout>
}

export default userSession;