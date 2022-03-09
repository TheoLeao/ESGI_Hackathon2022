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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const checkboxes = document.querySelectorAll("input:checked");
        const data = {};
        for (const c of checkboxes) {
            data[c.name] = c.value;
        }
        await answer(1, data);
    };

    const handleResponseChange = (event) => {
        console.log(event);
        const b = document.querySelector(`input[value="${event}"]`);
        b.checked = true;
        console.log(b.checked);
    };


    let initialValues = {};
    Object.keys(survey).map((y) => {
        initialValues = Object.assign(initialValues, { [y]: "" });
    })

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    
    })

    return (
        <>
            <div className={styles.heading}>
                <Heading as="h3" size="lg">
                    Formulaire
                </Heading>
            </div>
            <div className={styles.table}>
                <VStack as="form" onSubmit={handleSubmit}>
                    {survey &&
                        Object.keys(survey).map((i, index) => {
                            const question = survey[i];
                            return (
                                <FormControl id={i}>
                                    <FormLabel>{question.question}</FormLabel>
                                    <RadioGroup
                                        onChange={formik.handleChange}
                                        name={i}
                                        id={i}
                                        value={formik.values[i]}
                                    >
                                        <Stack spacing={5} direction="row">
                                            {question.responses &&
                                                question.responses.map((response) => {
                                                    console.log(response)
                                                    return (
                                                        <Radio name={i} value={response.value}>
                                                            {response.response}
                                                        </Radio>
                                                    );
                                                })}
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                            );
                        })}

                    <Button colorScheme="blue" mr={3} type="submit">
                        Répondre
                    </Button>
                </VStack>
            </div>
        </>
    );
};

Survey.getLayout = function getLayout(survey) {
    return <DashboardLayout>{survey}</DashboardLayout>;
};

export default Survey;