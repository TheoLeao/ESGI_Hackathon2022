
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

const User = ({ Component, pageProps }) => {

    let user = {
        "id": 8,
        "firstname": "Laveche",
        "lastname": "Pierre",
        "tel": "+33767679722",
        "mail": "pierre@laveche.fr",
        "age": 12, //int (year)
        "size": 179, //int (cm)
        "weight": 69,//int (kg)
        "isAdmin": 0, //boolean
        "address": {
            "id": 1,
            "street": "53 Cr Albert Thomas",
            "city": "Lyon",
            "postal_code": "69003",
            "country": "France",
        }
        };

            return (
               <>
               <div className={`${styles.info} `}>
                <Heading mb={10}> {user.firstname} Profile</Heading>
                <Table variant='simple' className={styles.table}>
                <Tbody>
                    <Tr>
                        <Td>firstname</Td>
                        <Td>{user.firstname}</Td>
                    </Tr>
                    <Tr>
                        <Td>lastname</Td>
                        <Td>{user.lastname}</Td>
                    </Tr>
                    <Tr>
                        <Td>tel</Td>
                        <Td>{user.tel}</Td>
                    </Tr>
                    <Tr>
                        <Td>mail</Td>
                        <Td>{user.mail}</Td>
                    </Tr>
                    <Tr>
                        <Td>age</Td>
                        <Td>{user.age}</Td>
                    </Tr>
                    <Tr>
                        <Td>size</Td>
                        <Td>{user.size}</Td>
                    </Tr>
                    <Tr>
                        <Td>weight</Td>
                        <Td>{user.weight}</Td>
                    </Tr>
                </Tbody>
            </Table>
            </div>


            <div className={`${styles.address} `}>
                <Heading mb={10} mt={28}> Address</Heading>
                <Table variant='simple' className={styles.table}>
                <Tbody>
                     <Tr>
                        <Td>street</Td>
                        <Td>{user.address.street}</Td>
                    </Tr>
                    <Tr>
                        <Td>city</Td>
                        <Td>{user.address.city}</Td>
                    </Tr>
                    <Tr>
                        <Td>postal code</Td>
                        <Td>{user.address.postal_code}</Td>
                    </Tr>
                    <Tr>
                        <Td>country</Td>
                        <Td>{user.address.country}</Td>
                    </Tr>
                </Tbody>
            </Table>
            </div>
</>
            
    )
}

User.getLayout = function getLayout(User) {
    return <DashboardLayout>{User}</DashboardLayout>
}

export default User;