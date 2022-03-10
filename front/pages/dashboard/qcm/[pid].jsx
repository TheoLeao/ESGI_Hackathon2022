import styles from "./index.module.scss";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import { FormControl, FormLabel, Button } from "@chakra-ui/react";
import { answer, survey as getSurvey } from "../../../src/api/api";
import { useRouter } from "next/router";

const Survey = ({ Component, pageProps }) => {
    const [survey, setSurvey] = useState([]);
    const router = useRouter();

    useEffect(async () => {
        if (false === router.isReady) {
            return;
        }
        const { pid } = router.query;
        setSurvey(await getSurvey(pid));
    }, [router.isReady]);

    const handleSubmit = async () => {
        const checkboxes = document.querySelectorAll("input:checked");
        const data = {};
        for (const c of checkboxes) {
            data[c.name] = c.value;
        }
        await answer(1, data);
    };

    return (
        <>
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
        </>
    );
};

Survey.getLayout = function getLayout(survey) {
    return <DashboardLayout>{survey}</DashboardLayout>;
};

export default Survey;
