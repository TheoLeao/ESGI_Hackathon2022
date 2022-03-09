
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

const UsersList = ({ Component, pageProps }) => {


    const [usersList, setUsersList] = useState([]);
        // function userApi(){

        useEffect(() => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer 2|4xJWQQi9RfNvZLU9s732d5CyATO2YZKxlbdQsDUc");
    
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
    
            fetch("http://hackathon.alexis-guay.fr/api/users", requestOptions)
            .then(response => response.text())
            .then(function(result){
                console.log(result)
               setUsersList(JSON.parse(result));
          })
            .catch(error => console.log('error', error));
        // }
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