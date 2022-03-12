import { Heading, useQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { metrics as getMetrics } from "../../src/api/api";
import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";
import styles from "./index.module.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Lottie from "react-lottie";
import loader from "../../src/lotties/loader.json";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Index = ({ Component, pageProps }) => {
    const [isDataLoading, setIsDataLoading] = useState(true);
    const role = null;
    if (typeof window !== 'undefined') {
        role = sessionStorage.getItem("role");
        if (role == 'tester') {
            return (
                <h1>Vous n'avez pas l'accès ⛔</h1>
            )
        }
    }
    const [metrics, setMetrics] = useState({
        users: [],
        sessions: [],
        campaigns: [],
        userSessions: [],
    });
    const router = useRouter();
    useEffect(async () => {
        if (false === router.isReady) {
            return;
        }
        setMetrics(await getMetrics());
        setIsDataLoading(false)
    }, [router.isReady]);
    return (
        <>
            <div className={styles.container}>
                {isDataLoading ? <div className={styles.loader}><Lottie
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

                /></div> : <div className={styles.fadeinContent}>

                    <Heading as="h3" size="lg" style={{ marginBottom: '20px' }}>
                        Les statistiques tests
                    </Heading>
                    <div className={styles.container}>

                        <div className={styles.statGroup}>
                            <Heading as="h5" size="sm" style={{ marginBottom: '20px' }}>
                                Evolution du nombre de testeurs
                            </Heading>

                            <div className={styles.content}>
                                <Line
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                    }}
                                    data={{
                                        labels: [...Object.keys(metrics.users)],
                                        datasets: [
                                            {
                                                label: "Evolution",
                                                data: [...Object.values(metrics.users)],
                                                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                                                borderColor: ["rgba(255, 99, 132, 1)"],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                />
                            </div>
                        </div>

                        <div className={styles.statGroup}>
                            <Heading as="h5" size="sm" style={{ marginBottom: '20px' }}>
                                Progression du nombre de sessions
                            </Heading>
                            <div className={styles.content}>
                                <Line
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                    }}
                                    data={{
                                        labels: [...Object.keys(metrics.sessions)],
                                        datasets: [
                                            {
                                                label: "Evolution",
                                                data: [...Object.values(metrics.sessions)],
                                                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                                                borderColor: ["rgba(255, 99, 132, 1)"],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                />
                            </div>
                        </div>

                        <div className={styles.statGroup}>
                            <Heading as="h5" size="sm" style={{ marginBottom: '20px' }}>
                                Evolution du nombre de campagne
                            </Heading>
                            <div className={styles.content}>
                                <Line
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                    }}
                                    data={{
                                        labels: [...Object.keys(metrics.campaigns)],
                                        datasets: [
                                            {
                                                label: "Evolution",
                                                data: [...Object.values(metrics.campaigns)],
                                                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                                                borderColor: ["rgba(255, 99, 132, 1)"],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.statGroup}>
                            <Heading as="h5" size="sm" style={{ marginBottom: '20px' }}>
                                Evolution du nombre de de testeurs
                                <br />
                                ayant réalisé une session dans le mois
                            </Heading>
                            <div className={styles.content}>
                                <Line
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: true,
                                    }}
                                    data={{
                                        labels: [...Object.keys(metrics.userSessions)],
                                        datasets: [
                                            {
                                                label: "Evolution",
                                                data: [...Object.values(metrics.userSessions)],
                                                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                                                borderColor: ["rgba(255, 99, 132, 1)"],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    );
};

Index.getLayout = function getLayout(Index) {
    return <DashboardLayout>{Index}</DashboardLayout>;
};

export default Index;
