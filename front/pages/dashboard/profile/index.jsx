
import {Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import {user} from '../../../src/api/api';
import {me} from '../../../src/api/api';
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

        const [infoUser, setUsersList] = useState([]);
 
        useEffect(async () => {
            let id = await me();
            let value = await user(id.id);
            setUsersList(value);

        }, [])
  
            return (
               <>
               {console.log("dqdqs")}
               {console.log(infoUser)}
               <div className={`${styles.info} `}>
                 <Heading mb={10}> {infoUser.name} Profile</Heading>
                <Table variant='simple' className={styles.table}>
                <Tbody>
                    <Tr>
                        <Td>name</Td>
                        <Td>{infoUser.name}</Td>
                    </Tr>
                    <Tr>
                        <Td>phone</Td>
                        <Td>{infoUser.phone}</Td>
                    </Tr>
                    <Tr>
                        <Td>email</Td>
                        <Td>{infoUser.email}</Td>
                    </Tr>
                    <Tr>
                        <Td>birth</Td>
                        <Td>{infoUser.birth}</Td>
                    </Tr>
                    <Tr>
                        <Td>size</Td>
                        <Td>{infoUser.size}</Td>
                    </Tr>
                    <Tr>
                        <Td>weight</Td>
                        <Td>{infoUser.weight}</Td>
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
                        <Td>{infoUser?.address?.street}</Td>
                    </Tr>
                    <Tr>
                        <Td>city</Td>
                        <Td>{infoUser?.address?.city}</Td>
                    </Tr>
                    <Tr>
                        <Td>zipcode</Td>
                        <Td>{infoUser?.address?.zipcode}</Td>
                    </Tr>
                    <Tr>
                        <Td>country</Td>
                        <Td>{infoUser?.address?.country}</Td>
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