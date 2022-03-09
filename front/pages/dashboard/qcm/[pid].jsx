import styles from "./index.module.scss";
import { Checkbox, Radio, RadioGroup } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import { Stack, VStack, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { answer, survey as getSurvey } from "../../../src/api/api";
import { useFormik } from "formik";

const Survey = ({ Component, pageProps }) => {
    const [survey, setSurvey] = useState([]);

    useEffect(async () => {
        setSurvey(await getSurvey(1));
    }, []);

    const handleSubmit = async () => {
        const checkboxes = document.querySelectorAll("input:checked");
        const data = {};
        for (const c of checkboxes) {
            data[c.name] = c.value;
        }
        console.log(data);
        // await answer(1, data);
    };

    const handleResponseChange = (event) => {
        console.log(event);
        const b = document.querySelector(`input[value="${event}"]`);
        b.checked = true;
        console.log(b.checked);
    };

    let initialValues = {};
    Object.keys(survey).map((y) => {
        initialValues = Object.assign(initialValues, { [y]: y.userResponse?.response_id });
    });

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            handleSubmit();
            alert(JSON.stringify(values, null, 2));
        },
    });

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
                                            console.log(response);
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
