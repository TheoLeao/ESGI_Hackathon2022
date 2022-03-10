
import {Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import {users} from '../../../src/api/api';
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

const UsersList = ({ Component, pageProps }) => {

    const role = null;
    if (typeof window !== 'undefined') {
        role = sessionStorage.getItem("role");
        if(role == 'tester') {
            return (
                <h1>You don't have the rights ⛔</h1>
            )
        }
    }

    const [usersList, setUsersList] = useState([]);

        
        useEffect(async () => {

            let value = await users();
            setUsersList(value);
        }, [])
 
            return (
                
               <>
        
                <Heading mb={10}>Liste des testeurs</Heading>
                <Table variant='simple' className={styles.table}>
                <Thead>
                    <Tr>
                        <Th>id</Th>
                        <Th>name</Th>
                        <Th>tel</Th>
                        <Th>mail</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {usersList.map((user) => {
                        return <Tr key={user}>
                            <Td>{user.id}</Td>
                            <Td>{user.name}</Td>
                            <Td>{user.phone}</Td>
                            <Td>{user.email}</Td>
                        </Tr>
                    })}
            
                </Tbody>
            </Table>
</>
            
    )
}

UsersList.getLayout = function getLayout(UsersList) {
    return <DashboardLayout>{UsersList}</DashboardLayout>
}

export default UsersList;