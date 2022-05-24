import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { RiMenu3Fill } from "react-icons/ri";

export function HeaderHome({onOpenMenu}) {

    const router = useRouter()

    return (
        <Flex
            w="100%"
            justify="space-between"
            align="center"
        >
            <Text
                fontSize="2xl"
                mt="1rem"
                fontWeight={600}
                marginBottom="2rem"
            >
                Pokedex
            </Text>
            <RiMenu3Fill
                size={22}
                color="#333"
                style={{ zIndex: 4, cursor: "pointer" }}
                onClick={onOpenMenu}

            />
        </Flex>
    )
}