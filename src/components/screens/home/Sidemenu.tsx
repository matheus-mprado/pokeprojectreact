import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Input, Text, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { useRef } from "react";
import { MdKeyboardArrowRight } from 'react-icons/md'
import { LinkMenu } from "../../core/LinkMenu";

export function Sidemenu({ isOpen, onClose }) {

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Pokedex Menu</DrawerHeader>

                <DrawerBody
                    px="0"
                >
                    <LinkMenu href="/MyPokemons" title="My Pokemons" />
                    <LinkMenu href="/WishList" title="Wish List" />
                </DrawerBody>

            </DrawerContent>
        </Drawer>
    )
}