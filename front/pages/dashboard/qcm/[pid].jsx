import styles from "./index.module.scss";
import { Radio, RadioGroup, useToast } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import { FormControl, FormLabel, Button } from "@chakra-ui/react";
import { answer, survey as getSurvey } from "../../../src/api/api";
import { useRouter } from "next/router";
import { FiArrowLeft } from "react-icons/fi";
import Lottie from "react-lottie";
import loader from "../../../src/lotties/loader.json";
import NoResult from "../../../src/components/NoResult/NoResult";
import useQuery from "../../../src/hooks/useQuery";

const Survey = ({ Component, pageProps }) => {
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [haveResult, setHaveResult] = useState(true);
    const [survey, setSurvey] = useState([]);
    const [role, setRole] = useState("");
    const [sessionId, setSessionId] = useState(1);
    const router = useRouter();
    const query = useQuery();
    const toast = useToast();
    useEffect(async () => {
        if (!query) {
            return;
        }
        const { pid } = query;
        let survey_data = await getSurvey(pid);
        setSessionId(pid);
        setSurvey(survey_data);
        setIsDataLoading(false);
        setRole(sessionStorage.getItem("role"));
        survey_data.length === 0 && setHaveResult(false);
    }, [query]);

    const handleSubmit = async () => {
        const checkboxes = document.querySelectorAll("input:checked");
        if (checkboxes.length === 0) {
            return;
        }
        const data = {};
        for (const c of checkboxes) {
            data[c.name] = c.value;
        }
        try {
            await answer(sessionId, data);
            toast({
                title: "Vos réponses ont bien été pris en compte",
                status: "success",
                duration: 6000,
                isClosable: true,
            });
        } catch {
            toast({
                title: "Echec de l'enregistrement de vos données",
                status: "error",
                duration: 6000,
                isClosable: true,
            });
        }
    };

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
                ) : !haveResult ? (
                    <NoResult text="Aucune question n'a été trouvée pour ce QCM "></NoResult>
                ) : (
                    <>
                        <div className={styles.fadeinContent}>
                            <Button
                                style={{ marginBottom: "10px" }}
                                leftIcon={<FiArrowLeft />}
                                colorScheme="grey"
                                variant="outline"
                                size="xs"
                                onClick={() => router.back()}
                            >
                                Retour
                            </Button>
                            <div className={styles.heading}>
                                <Heading as="h3" size="lg">
                                    Formulaire
                                </Heading>
                            </div>
                            <div className={styles.table}>
                                {survey &&
                                    Object.keys(survey).map((i, index) => {
                                        const question = survey[i];
                                        const name = "question_" + question.id;
                                        return (
                                            <div className={styles.group}>
                                                <FormControl>
                                                    <FormLabel>{question.question}</FormLabel>
                                                    <RadioGroup
                                                        className={styles.list}
                                                        name={name}
                                                        defaultValue={question.userResponse?.response_id.toString()}
                                                    >
                                                        {question.responses &&
                                                            question.responses.map((response) => {
                                                                return (
                                                                    <div className={styles.radioItem}>
                                                                        <Radio
                                                                            colorScheme="red"
                                                                            value={response.id.toString()}
                                                                        >
                                                                            {response.response}
                                                                        </Radio>
                                                                    </div>
                                                                );
                                                            })}
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        );
                                    })}

                                {role === "tester" && (
                                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                                        Répondre
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

Survey.getLayout = function getLayout(survey) {
    return <DashboardLayout>{survey}</DashboardLayout>;
};

export default Survey;
