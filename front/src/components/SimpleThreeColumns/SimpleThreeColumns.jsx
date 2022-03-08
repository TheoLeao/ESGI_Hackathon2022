import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex, Heading, Center, Container } from '@chakra-ui/react';
import { FcAbout, FcRightUp, FcApproval } from 'react-icons/fc';


const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box p={5} mt={28}>
      <Stack spacing={4} md={20} as={Container} maxW={'3xl'} textAlign={'center'}>
      <Center> <Heading>Nomadic labgrade IOT device and smart app</Heading></Center>
        <Text color={'gray.600'} fontSize={'xl'}>
        WIRED BEAUTY is a French beauty-tech market research company which invested 1,3M€ to develop a non invasive, portable lab connected device to deliver labgrade and real time measurements of skin markers to dermocosmetic lab as well as a smart app in order to also harvest consumer perception.
        </Text>
      </Stack>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} m={10}>
        <Feature
          icon={<Icon as={FcAbout} w={10} h={10} />}
          title={'Wired beauty is new'}
          text={
            'Hybrid studies combining objective clinical results measurements & consumer perception. '
          }
        />
        <Feature
          icon={<Icon as={FcRightUp} w={10} h={10} />}
          title={'Wired beauty is different'}
          text={
            'Proprietary IOT and Algorythm allowing decifering within minutes combined with a consumer app harvesting consumer opinions.'
          }
        />
        <Feature
          icon={<Icon as={FcApproval} w={10} h={10} />}
          title={'Wired beauty is better'}
          text={
            'Real World Evidence (link with pollution, UV  and lifestyle) of skincare efficiency on large statistical basis (ex 1000 testers).'
          }
        />
      </SimpleGrid>
    </Box>
  );
}
