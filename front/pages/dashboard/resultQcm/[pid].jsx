import { Heading, SimpleGrid, Alert, AlertIcon, Select } from '@chakra-ui/react';
import { useEffect, useState, queryKey } from 'react';
import styles from './index.module.scss';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Bar, Doughnut } from 'react-chartjs-2';
import { useRouter } from 'next/router';
import { metricsSession } from '../../../src/api/api'


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
import useQuery from '../../../src/hooks/useQuery';
import DashboardLayout from '../../../src/layouts/DashboardLayout/DashboardLayout';

const ResultQcm = ({ Component, pageProps }) => {
    const query = useQuery();
    const [result, setResultList] = useState([]);
    const [value, setValue] = useState("Bar");

    useEffect(async () => {
        if (!query) {
            return;
        }
        const { pid } = query;
        let result_data = await metricsSession(pid);
        setResultList(result_data);
    }, [query]);


    function dataLabel(stats) {
        const label = [];

        result.metrics[stats].responses.map((response) => {
            label.push(response.response);
        })
        return label;
    }

    function dataValue(stats) {
        const value = [];

        result.metrics[stats].responses.map((response) => {
            value.push(response.total);
        })
        return value;
    }


    function logValue() {
        console.log(value);
        return value;
    }



    return (

        <>

            <div>
                <Select mb={5} w={400} value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }} placeholder='Sélectionner le type de graphique'
                    bg={'white'}
                    color='black'
                    defaultValue="Bar"
                >
                    <option value='Bar'>Bar</option>
                    <option value='Doughnut'>Doughnut</option>
                </Select>
            </div>


            {result.length == 0 &&
                <Alert status='warning'>
                    <AlertIcon />
                    Il n'y a pas encore de statistiques pour cette session
                </Alert>
            }

            <Heading mb={10}>Résultats du Qcm</Heading>
            {result.length > 0 &&
                <Heading as="h4" size="sm" mb={10} >Nombre de réponses : {result.totalUsers} </Heading>
            }

            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
                {Object.keys(result.metrics || []).map((stats) => {

                    return <div key={stats}>
                        <h2>{result.metrics[stats].question}</h2>

                        {logValue() == "Bar" &&
                            <Bar
                                data={{
                                    labels: dataLabel(stats),
                                    datasets: [{
                                        label: 'Réponses',
                                        data: dataValue(stats),
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                        ],
                                        borderWidth: 1
                                    }]
                                }}
                                width={400}
                                height={400}
                                options={{
                                    responsive: false,
                                    maintainAspectRatio: false
                                }}
                            />
                        }

                        {logValue() == "Doughnut" &&
                            <Doughnut
                                data={{
                                    labels: dataLabel(stats),
                                    datasets: [{
                                        label: 'Réponses',
                                        data: dataValue(stats),
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)'
                                        ],
                                        borderWidth: 1
                                    }]
                                }}
                                width={400}
                                height={400}
                                options={{
                                    responsive: false,
                                    maintainAspectRatio: false
                                }}
                            />
                        }

                    </div>

                })}
            </SimpleGrid>

        </>

    )
}

ResultQcm.getLayout = function getLayout(ResultQcm) {
    return <DashboardLayout>{ResultQcm}</DashboardLayout>
}

export default ResultQcm;