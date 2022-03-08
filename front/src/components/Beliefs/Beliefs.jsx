import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex, Center, Heading } from '@chakra-ui/react';
import { FcViewDetails } from 'react-icons/fc';
import { CheckIcon } from '@chakra-ui/icons';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Center>
      <Flex
        w={32}
        h={32}
        align={'center'}
        justify={'center'}
        color={'green'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
      </Center>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box p={4} mt={20}>
      <Center mb={1}> <Heading>OUR BELIEFS</Heading></Center>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} textAlign={'center'}>
        <Feature
          icon={<Icon as={CheckIcon} w={10} h={10} />}
          title={'IOT can save R&D money and speed-up product launch tempo'}
        />
        <Feature
          icon={<Icon as={CheckIcon} w={10} h={10} />}
          title={'Repeatability of protocols increases reliability of results'}
        />
        <Feature
          icon={<Icon as={CheckIcon} w={10} h={10} />}
          title={'Data Science can help cosmetic scientists'}
        />
      </SimpleGrid>
    </Box>
  );
}
