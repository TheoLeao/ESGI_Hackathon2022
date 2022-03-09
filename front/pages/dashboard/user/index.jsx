
import {Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
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


        const [user, setUsersList] = useState([]);
 
        useEffect(() => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer 3|3WAPauiyEbeYGr4FRpZg1hHtagkj1KmsIs4Q81ow");
          

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch("http://hackathon.alexis-guay.fr/api/users/2", requestOptions)
            .then(response => response.text())
            .then(function(result){
                console.log(result);
               setUsersList(JSON.parse(result));
             })
            .catch(error => console.log('error', error));
        }, [])
  
     
            return (
               <>
               <div className={`${styles.info} `}>
                 <Heading mb={10}> {user.name} Profile</Heading>
                <Table variant='simple' className={styles.table}>
                <Tbody>
                    <Tr>
                        <Td>name</Td>
                        <Td>{user.name}</Td>
                    </Tr>
                    <Tr>
                        <Td>phone</Td>
                        <Td>{user.phone}</Td>
                    </Tr>
                    <Tr>
                        <Td>email</Td>
                        <Td>{user.email}</Td>
                    </Tr>
                    <Tr>
                        <Td>birth</Td>
                        <Td>{user.birth}</Td>
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
                        <Td>{user?.address?.street}</Td>
                    </Tr>
                    <Tr>
                        <Td>city</Td>
                        <Td>{user?.address?.city}</Td>
                    </Tr>
                    <Tr>
                        <Td>zipcode</Td>
                        <Td>{user?.address?.zipcode}</Td>
                    </Tr>
                    <Tr>
                        <Td>country</Td>
                        <Td>{user?.address?.country}</Td>
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