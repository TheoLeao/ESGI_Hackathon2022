import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { register } from "../../src/api/api";
import * as Yup from "yup";
import React, { useState } from "react";
import theme from "../../src/theme/theme";
import { useRouter } from "next/router";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import styles from "./index.module.scss";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [focusAutocompleting, setFocusAutocompleting] = useState(false);
    const [hoverAutocompleting, setHoverAutocompleting] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const router = useRouter();

    const debounce = (func, wait) => {
        let timeout;

        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const geoApi = "https://api-adresse.data.gouv.fr/search/?";

    const autocomplete = debounce(async (e) => {
        const addressCandidate = e.target.value;
        if (addressCandidate.length < 2) {
            return;
        }
        const req = await fetch(`${geoApi}q=${addressCandidate}`);
        const rep = await req.json();
        setAddresses(rep.features);
    }, 500);

    const choiceAdress = (address) => {
        document.getElementById("autocomplete").value = address.properties.label;
        formik.setFieldValue("street", address.properties.name);
        formik.setFieldValue("city", address.properties.city);
        formik.setFieldValue("zipCode", address.properties.postcode);
        formik.setFieldValue("country", "France");
        formik.setFieldValue("latitude", address.geometry?.coordinates?.[0]);
        formik.setFieldValue("longitude", address.geometry?.coordinates?.[1]);
        console.log(formik.values);
    };

    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
        passwordConfirmation: Yup.string().required("Password confirmation is required"),
        name: Yup.string().required("Name is required"),
        phone: Yup.string().required("Phone is required"),
        birth: Yup.string().required("Birthday is required"),
        size: Yup.string().required("Size is required"),
        weight: Yup.string().required("Weight is required"),
        street: Yup.string().required("Street is required"),
        city: Yup.string(),
        zipCode: Yup.string(),
        country: Yup.string(),
        latitude: Yup.string(),
        longitude: Yup.string(),
    });
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            let value = await register(values);
            if (sessionStorage["token"] != null && value != null) {
                router.push("/dashboard");
            }
        },
    });

    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        Become a new tester !
                    </Text>
                </Stack>
                <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
                    <Stack spacing={4}>
                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input type="name" onChange={formik.handleChange} value={formik.values.name} />
                            {formik.errors.name ? (
                                <Text fontSize="sm" color={theme.colors.danger.normal}>
                                    {formik.errors.name}
                                </Text>
                            ) : null}
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" onChange={formik.handleChange} value={formik.values.email} />
                            {formik.errors.email ? (
                                <Text fontSize="sm" color={theme.colors.danger.normal}>
                                    {formik.errors.email}
                                </Text>
                            ) : null}
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                {formik.errors.password ? (
                                    <Text fontSize="sm" color={theme.colors.danger.normal}>
                                        {formik.errors.password}
                                    </Text>
                                ) : null}
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                                    >
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl id="passwordConfirmation" isRequired>
                            <FormLabel>Password confirmation</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    onChange={formik.handleChange}
                                    value={formik.values.passwordConfirmation}
                                />
                                {formik.errors.passwordConfirmation ? (
                                    <Text fontSize="sm" color={theme.colors.danger.normal}>
                                        {formik.errors.passwordConfirmation}
                                    </Text>
                                ) : null}
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                                    >
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <HStack>
                            <Box>
                                <FormControl id="phone" isRequired>
                                    <FormLabel>Phone</FormLabel>
                                    <Input type="text" onChange={formik.handleChange} value={formik.values.phone} />
                                    {formik.errors.phone ? (
                                        <Text fontSize="sm" color={theme.colors.danger.normal}>
                                            {formik.errors.phone}
                                        </Text>
                                    ) : null}
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="birth" isRequired>
                                    <FormLabel>Birthday</FormLabel>
                                    <Input type="date" onChange={formik.handleChange} value={formik.values.birth} />
                                    {formik.errors.birth ? (
                                        <Text fontSize="sm" color={theme.colors.danger.normal}>
                                            {formik.errors.birth}
                                        </Text>
                                    ) : null}
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="street" isRequired>
                            <div className={styles.autocomplete}>
                                <FormLabel>Street</FormLabel>
                                <Input
                                    type="text"
                                    id="autocomplete"
                                    autoComplete="none"
                                    onChange={autocomplete}
                                    onFocus={() => setFocusAutocompleting(true)}
                                    onBlur={() => setFocusAutocompleting(false)}
                                />
                                {(focusAutocompleting || hoverAutocompleting) && (
                                    <div
                                        className={styles.autocompleteResult}
                                        onMouseEnter={() => setHoverAutocompleting(true)}
                                        onMouseLeave={() => setHoverAutocompleting(false)}
                                    >
                                        {addresses.map((a) => {
                                            return <div onClick={(e) => choiceAdress(a)}>{a.properties.label}</div>;
                                        })}
                                    </div>
                                )}
                            </div>
                        </FormControl>
                        <HStack>
                            <Box>
                                <FormControl id="size" isRequired>
                                    <FormLabel>Size</FormLabel>
                                    <Input type="text" onChange={formik.handleChange} value={formik.values.size} />
                                    {formik.errors.size ? (
                                        <Text fontSize="sm" color={theme.colors.danger.normal}>
                                            {formik.errors.size}
                                        </Text>
                                    ) : null}
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="weight" isRequired>
                                    <FormLabel>Weight</FormLabel>
                                    <Input type="text" onChange={formik.handleChange} value={formik.values.weight} />
                                    {formik.errors.weight ? (
                                        <Text fontSize="sm" color={theme.colors.danger.normal}>
                                            {formik.errors.weight}
                                        </Text>
                                    ) : null}
                                </FormControl>
                            </Box>
                        </HStack>

                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                onClick={formik.handleSubmit}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                Already a user?{" "}
                                <Link color={"blue.400"} href={"/login"}>
                                    Login
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Register;
