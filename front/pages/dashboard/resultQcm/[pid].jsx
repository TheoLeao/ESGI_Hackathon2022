import { Heading, SimpleGrid, Alert, AlertIcon, Select, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Bar, Doughnut } from "react-chartjs-2";
import { exportPdf, metricsSession } from "../../../src/api/api";
import useQuery from "../../../src/hooks/useQuery";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import Lottie from "react-lottie";
import loader from "../../../src/lotties/loader.json";
import NoResult from "../../../src/components/NoResult/NoResult";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, CategoryScale, LinearScale, BarElement);

const ResultQcm = ({ Component, pageProps }) => {
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [haveResult, setHaveResult] = useState(true);
    const query = useQuery();
    const [result, setResultList] = useState([]);
    const [sessionId, setSessionId] = useState(undefined);
    const [value, setValue] = useState("Bar");
    useEffect(async () => {
        if (!query) {
            return;
        }
        const { pid } = query;
        setSessionId(pid);
        let result_data = await metricsSession(pid);
        setResultList(result_data);
        setIsDataLoading(false);

        result_data.metrics.length === 0 && setHaveResult(false);
    }, [query]);

    function dataLabel(stats) {
        const label = [];

        result.metrics[stats].responses.map((response) => {
            label.push(response.response);
        });
        return label;
    }

    function dataValue(stats) {
        const value = [];

        result.metrics[stats].responses.map((response) => {
            value.push(response.total);
        });
        return value;
    }

    function logValue() {
        console.log(value);
        return value;
    }

    return (
        <>
            <div className={styles.container}>
                {isDataLoading ? (
                    <div className={styles.loader}>
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: loader,
                                rendererSettings: {
                                    preserveAspectRatio: "xMidYMid slice",
                                },
                            }}
                            height={200}
                            width={200}
                        />
                    </div>
                ) : (
                    <div className={styles.fadeinContent}>
                        <>
                            {!haveResult ? (
                                <NoResult text="Aucun résultat n'a été trouvé pour ce QCM"></NoResult>
                            ) : (
                                <>
                                    <div className={styles.binks}>
                                        <Select
                                            mb={5}
                                            w={400}
                                            value={value}
                                            onChange={(e) => {
                                                setValue(e.target.value);
                                            }}
                                            placeholder="Sélectionner le type de graphique"
                                            bg={"white"}
                                            color="black"
                                            defaultValue="Bar"
                                        >
                                            <option value="Bar">Bar</option>
                                            <option value="Doughnut">Doughnut</option>
                                        </Select>

                                        {sessionId && (
                                            <Button colorScheme="pink" as="a" href={exportPdf(sessionId)}>
                                                Exporter en PDF
                                            </Button>
                                        )}
                                    </div>

                                    {result.length == 0 && (
                                        <Alert status="warning">
                                            <AlertIcon />
                                            Il n'y a pas encore de statistiques pour cette session
                                        </Alert>
                                    )}

                                    <Heading mb={10}>Résultats du Qcm</Heading>
                                    {result.length > 0 && (
                                        <Heading as="h4" size="sm" mb={10}>
                                            Nombre de réponses : {result.totalUsers}{" "}
                                        </Heading>
                                    )}

                                    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
                                        {Object.keys(result.metrics || []).map((stats) => {
                                            return (
                                                <div key={stats}>
                                                    <h2>{result.metrics[stats].question}</h2>

                                                    {logValue() == "Bar" && (
                                                        <Bar
                                                            data={{
                                                                labels: dataLabel(stats),
                                                                datasets: [
                                                                    {
                                                                        label: "Réponses",
                                                                        data: dataValue(stats),
                                                                        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                                                                        borderColor: ["rgba(255, 99, 132, 1)"],
                                                                        borderWidth: 1,
                                                                    },
                                                                ],
                                                            }}
                                                            width={400}
                                                            height={400}
                                                            options={{
                                                                responsive: false,
                                                                maintainAspectRatio: false,
                                                            }}
                                                        />
                                                    )}

                                                    {logValue() == "Doughnut" && (
                                                        <Doughnut
                                                            data={{
                                                                labels: dataLabel(stats),
                                                                datasets: [
                                                                    {
                                                                        label: "Réponses",
                                                                        data: dataValue(stats),
                                                                        backgroundColor: [
                                                                            "rgba(255, 99, 132, 0.2)",
                                                                            "rgba(54, 162, 235, 0.2)",
                                                                            "rgba(255, 206, 86, 0.2)",
                                                                            "rgba(75, 192, 192, 0.2)",
                                                                            "rgba(153, 102, 255, 0.2)",
                                                                            "rgba(255, 159, 64, 0.2)",
                                                                        ],
                                                                        borderColor: [
                                                                            "rgba(255, 99, 132, 1)",
                                                                            "rgba(54, 162, 235, 1)",
                                                                            "rgba(255, 206, 86, 1)",
                                                                            "rgba(75, 192, 192, 1)",
                                                                            "rgba(153, 102, 255, 1)",
                                                                            "rgba(255, 159, 64, 1)",
                                                                        ],
                                                                        borderWidth: 1,
                                                                    },
                                                                ],
                                                            }}
                                                            width={400}
                                                            height={400}
                                                            options={{
                                                                responsive: false,
                                                                maintainAspectRatio: false,
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </SimpleGrid>
                                </>
                            )}
                        </>
                    </div>
                )}
            </div>
        </>
    );
};

ResultQcm.getLayout = function getLayout(ResultQcm) {
    return <DashboardLayout>{ResultQcm}</DashboardLayout>;
};

export default ResultQcm;
