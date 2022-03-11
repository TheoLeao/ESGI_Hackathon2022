import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useFormik, Formik } from "formik";
import { login } from "../../src/api/api";
import * as Yup from "yup";
import React, { useState } from "react";
import theme from "../../src/theme/theme";
import { useRouter } from "next/router";

const Login = () => {
    const router = useRouter();
    const initialRef = React.useRef();
    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object({
        email: Yup.string().required("The email is required"),
        password: Yup.string().required("Password is required"),
    });
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await login(values.email, values.password);
            if (sessionStorage["token"] != null && sessionStorage["role"] == "admin") {
                router.push("/dashboard");
            } else if (sessionStorage["token"] != null && sessionStorage["role"] == "tester") {
                router.push("/dashboard/campaign");
            }
        },
    });

    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        Welcome back !
                    </Text>
                </Stack>
                <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" onChange={formik.handleChange} value={formik.values.email} />
                            {formik.errors.email ? (
                                <Text fontSize="sm" color={theme.colors.danger.normal}>
                                    {formik.errors.email}
                                </Text>
                            ) : null}
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" onChange={formik.handleChange} value={formik.values.password} />
                            {formik.errors.password ? (
                                <Text fontSize="sm" color={theme.colors.danger.normal}>
                                    {formik.errors.password}
                                </Text>
                            ) : null}
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                onClick={formik.handleSubmit}
                            >
                                Sign in
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                No account ?{" "}
                                <Link color={"blue.400"} href={"/register"}>
                                    Register
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Login;
