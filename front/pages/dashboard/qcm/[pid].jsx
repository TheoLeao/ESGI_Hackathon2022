import styles from "./index.module.scss";
import { Checkbox, Radio, RadioGroup } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import { Stack, VStack, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { answer, survey as getSurvey } from "../../../src/api/api";
import { useFormik } from "formik";
import * as Yup from "yup";

const Survey = ({ Component, pageProps }) => {
    const [survey, setSurvey] = useState([]);
    const [initialValues, setInitialesValues] = useState([]);
    const [validationSchema, setValidationSchema] = useState([]);
    // const [formik, setFormik] = useState(undefined);

    useEffect(async () => {
        const survey = await getSurvey(1);
        let initialValues = {};
        const validationSchema = Yup.object({});

        for (const [index, value] of Object.entries(survey)) {
            initialValues["question_" + value.id] = value.userResponse?.response_id;
            const newValidationSchema = Yup.object({
                ["question_" + value.id]: Yup.string().required("La réponse est obligatoire"),
            });
            validationSchema.concat(newValidationSchema);
        }

        setInitialesValues(initialValues);
        setValidationSchema(validationSchema);
        setSurvey(survey);
    }, []);

    const handleSubmit = async () => {
        const checkboxes = document.querySelectorAll("input:checked");
        const data = {};
        for (const c of checkboxes) {
            data[c.name] = c.value;
        }
        console.log(data);
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
