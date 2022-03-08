import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from 'react-icons/io5';
import { ReactElement } from 'react';
import styles from './Story.module.scss';


const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

const SplitWithImage = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={36}>
      <Flex>
        <Image
          rounded={'md'}
          alt={'story image'}
          src={
            'https://images.unsplash.com/photo-1614308456595-a59d48697ea8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODF8fHNjaWVuY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60'
          }
          objectFit={'cover'}
        />
      </Flex>
      <Stack>
        <Text
          textTransform={'uppercase'}
          color={'blue.400'}
          fontWeight={600}
          fontSize={'sm'}
          bg={useColorModeValue('blue.50', 'blue.900')}
          p={2}
          alignSelf={'flex-start'}
          rounded={'md'}>
          Our story
        </Text>
        <Heading>Wired beauty</Heading>
        <Text color={'gray.500'} fontSize={'lg'}>
        BEAUTY SCIENCE AND  PROOFS
        </Text>
        <Stack>
          <Feature
            text={'Wired Beauty as of today is a saas based start-up co-founded by Stanislas and Sophie, two beauty experts who become friends while working toghether at l’Oréal.'}
          />
          <Feature
            text={'In 2021, considering the blue ocean of cosmetic market research and the latest demands of consumer on efficiency proofs especially in Asia, the two of them decided to pivot to a 100% B2B Saas company, convinced by the potential of this technology. '}
          />
        </Stack>
      </Stack>
    </SimpleGrid>
  );
}
export default SplitWithImage;