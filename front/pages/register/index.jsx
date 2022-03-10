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
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useFormik, Formik } from 'formik';
import { register } from '../../src/api/api';
import * as Yup from "yup";
import React, {useState} from 'react';
import theme from '../../src/theme/theme';
import { useRouter } from 'next/router';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Register = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const initialRef = React.useRef()
  const initialValues = {
      email: "",
      password: "",
  };
  const validationSchema = Yup.object({
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
      passwordConfirmation: Yup.string().required('Password confirmation is required'),
      name: Yup.string().required('Name is required'),
      phone: Yup.string().required('Phone is required'),
      birth: Yup.string().required('Birthday is required'),
      size: Yup.string().required('Size is required'),
      weight: Yup.string().required('Weight is required'),
      street: Yup.string().required('Street is required'),
      city: Yup.string().required('City is required'),
      zipCode: Yup.string().required('Zipcode is required'),
      country: Yup.string().required('Country is required'),

  });
  const formik = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        let value = register(values);
        if (sessionStorage['token'] != null && value != null) {
          router.push('/dashboard');
        }
      },
  })
  
  return (
    <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Become a new tester !
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="name" onChange={formik.handleChange} value={formik.values.name} />
                {formik.errors.name ? <Text fontSize='sm' color={theme.colors.danger.normal}>{formik.errors.name}</Text> : null}
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={formik.handleChange} value={formik.values.email} />
                {formik.errors.email ? <Text fontSize='sm' color={theme.colors.danger.normal}>{formik.errors.email}</Text> : null}
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} onChange={formik.handleChange} value={formik.values.password}/>
                  {formik.errors.password ? <Text fontSize='sm' color={theme.colors.danger.normal}>{formik.errors.password}</Text> : null}
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="passwordConfirmation" isRequired>
                <FormLabel>Password confirmation</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} onChange={formik.handleChange} value={formik.values.passwordConfirmation}/>
                  {formik.errors.passwordConfirmation ? <Text fontSize='sm' color={theme.colors.danger.normal}>{formik.errors.passwordConfirmation}</Text> : null}
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id="phone" isRequired>
                    <FormLabel>Phone</FormLabel>
                    <Input type="text" onChange={formik.handleChange} value={formik.values.phone}/>
                    {formik.errors.phone ? <Text fontSize='sm' color={theme.colors.danger.normal}>{formik.errors.phone}</Text> : null}
                  </FormControl>
                </Box>
                <Box>
                <FormControl id="birth" isRequired>
                  <FormLabel>Birthday</FormLabel>
                  <Input type="date" onChange={formik.handleChange} value={formik.values.birth}/>
                  {formik.errors.birth ? <Text fontSize='sm' color={theme.colors.danger.normal}>{formik.errors.birth}</Text> : null}
                </FormControl>
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <FormControl id="size" isRequired>
                    <FormLabel>Size</FormLabel>
                    <Input type="text" onChange={formik.handleChange} value={formik.values.size}/>
                    {formik.errors.size ? <Text fontSize='sm' color={theme.colors.danger.normal}>{formik.errors.size}</Text> : null}
                  </FormControl>
                </Box>
                <Box>
                <FormControl id="weight" isRequired>
                  <FormLabel>Weight</FormLabel>
                  <Input type="text" onChange={formik.handleChange} value={formik.values.weight}/>
                  {formik.errors.weight ? <Text fontSize='sm' color={theme.colors.danger.normal}>{formik.errors.weight}</Text> : null}
                </FormControl>
                </Box>
              </HStack>
              <FormControl id="street" isRequired>
                <FormLabel>Street</FormLabel>
                <Input type="text" onChange={formik.handleChange} value={formik.values.street} />
                {formik.errors.street ? <Text fontSize='sm' color={theme.colors.danger.normal}>{formik.errors.street}</Text> : null}
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id="city" isRequired>
                    <FormLabel>City</FormLabel>
                    <Input type="text" onChange={formik.handleChange} value={formik.values.city}/>
                    {formik.errors.city ? <Text fontSize='sm' color={theme.colors.danger.normal}>{formik.errors.city}</Text> : null}
                  </FormControl>
                </Box>
                <Box>
                <FormControl id="zipCode" isRequired>
                  <FormLabel>Zip code</FormLabel>
                  <Input type="text" onChange={formik.handleChange} value={formik.values.zipCode}/>
                  {formik.errors.zipCode ? <Text fontSize='sm' color={theme.colors.danger.normal}>{formik.errors.zipCode}</Text> : null}
                </FormControl>
                </Box>
              </HStack>
              <FormControl id="country" isRequired>
                <FormLabel>Country</FormLabel>
                <Input type="text" onChange={formik.handleChange} value={formik.values.country} />
                {formik.errors.country ? <Text fontSize='sm' color={theme.colors.danger.normal}>{formik.errors.country}</Text> : null}
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={formik.handleSubmit}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} href={'/login'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
  );
}

export default Register;