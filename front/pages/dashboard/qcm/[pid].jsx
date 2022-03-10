import styles from "./index.module.scss";
import { Radio, RadioGroup } from "@chakra-ui/react";
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
    const router = useRouter();
    const query = useQuery();
    useEffect(async () => {
        if (!query) {
            return;
        }
        const { pid } = query;
        let survey_data = await getSurvey(pid);
        setSurvey(survey_data);
        setIsDataLoading(false);
        survey_data.length === 0 && setHaveResult(false);
    }, [query]);

    const handleSubmit = async () => {
        const checkboxes = document.querySelectorAll("input:checked");
        const data = {};
        for (const c of checkboxes) {
            data[c.name] = c.value;
        }
        await answer(1, data);
    };

    return (
        <><div className={styles.container}>

            {isDataLoading ? <div className={styles.loader}>
                <Lottie
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

                />
            </div> :

                !haveResult ? <NoResult text="Aucune question n'a été trouvée pour ce QCM "></NoResult> : <>
                    <div className={styles.fadeinContent}>
                        <Button style={{ marginBottom: '10px' }} leftIcon={<FiArrowLeft />} colorScheme='grey' variant='outline' size='xs' onClick={() => router.back()}>
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
                                        <FormControl>
                                            <FormLabel>{question.question}</FormLabel>
                                            <RadioGroup name={name} defaultValue={question.userResponse?.response_id.toString()}>
                                                {question.responses &&
                                                    question.responses.map((response) => {
                                                        return (
                                                            <Radio colorScheme="red" value={response.id.toString()}>
                                                                {response.response}
                                                            </Radio>
                                                        );
                                                    })}
                                            </RadioGroup>
                                        </FormControl>
                                    );
                                })}

                            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                                Répondre
                            </Button>
                        </div>
                    </div>
                </>
            }
        </div>

        </>
    );
};

Survey.getLayout = function getLayout(survey) {
    return <DashboardLayout>{survey}</DashboardLayout>;
};

export default Survey;
