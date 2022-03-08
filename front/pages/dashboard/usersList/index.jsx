
import {Heading } from '@chakra-ui/react';
import styles from './index.module.scss';
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

    let usersList = [{
        "id": 8,
        "firstname": "Laveche",
        "lastname": "Pierre",
        "tel": "+33767679722",
        "mail": "pierre@laveche.fr",
        "age": 12, //int (year)
        "size": 179, //int (cm)
        "weight": 69,//int (kg)
        "isAdmin": 0 //boolean
        }];

            return (
               <>
                <Heading mb={10}>Testers List</Heading>
                <Table variant='simple' className={styles.table}>
                <Thead>
                    <Tr>
                        <Th>id</Th>
                        <Th>firstname</Th>
                        <Th>lastname</Th>
                        <Th>tel</Th>
                        <Th>mail</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {usersList.map((user) => {
                        return <Tr>
                            <Td>{user.id}</Td>
                            <Td>{user.firstname}</Td>
                            <Td>{user.lastname}</Td>
                            <Td>{user.tel}</Td>
                            <Td>{user.mail}</Td>
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