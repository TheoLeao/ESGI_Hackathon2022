import React, { ReactNode, useEffect, useState } from "react";
import { me } from "../../../src/api/api";
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
    FiBook,
    FiUser,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import Logo from "../Logo/Logo";
import theme from "../../theme/theme";
import { useRouter } from "next/router";

const LinkItems = [
    { name: "Accueil", icon: FiHome, href: "/dashboard/" },
    { name: "Les campagnes", icon: FiBook, href: "/dashboard/campaign/" },
    { name: "Les testeurs", icon: FiUser, href: "/dashboard/usersList" },
];

export default function SidebarWithHeader({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

const SidebarContent = ({ onClose, ...rest }) => {
    const role = null;
    if (typeof window !== 'undefined') {
        role = sessionStorage.getItem("role");
    }
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    <Logo colorProps={theme.colors.primary.normal}></Logo>
                </Text>
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => {
                if (role == 'tester' && link.name == 'Les campagnes')
                return <NavItem key={link.name} icon={link.icon} href={link.href}>
                        {link.name}
                    </NavItem>
                else if (role == 'admin')
                return <NavItem key={link.name} icon={link.icon} href={link.href}>
                        {link.name}
                    </NavItem>
            })}
        </Box>
    );
};

const NavItem = ({ icon, children, href, ...rest }) => {
    return (
        <Link href={href} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: theme.colors.primary.normal,
                    color: "white",
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: "white",
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({ onOpen, ...rest }) => {
    const token = null;
    const router = useRouter();
    if (typeof window !== "undefined") {
        token = sessionStorage.getItem("token");
        if (token == null) {
            router.push("/login");
        }
    }
    const [infoUser, setinfoUser] = useState([]);

    useEffect(async () => {
        setinfoUser(await me());
    }, []);

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text display={{ base: "flex", md: "none" }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{ base: "0", md: "6" }}>
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
                            <HStack>
                                <Avatar size={"sm"} src={"/profil.png"} />
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">{infoUser.name}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        {infoUser.role}
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue("white", "gray.900")}
                            borderColor={useColorModeValue("gray.200", "gray.700")}
                        >
                            <Link href="/dashboard/profile">
                                <MenuItem>Profile</MenuItem>
                            </Link>
                            <MenuDivider />
                            <Link href="/login">
                                <MenuItem>Sign out</MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
