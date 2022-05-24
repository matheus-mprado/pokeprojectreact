import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HiStar } from "react-icons/hi";

export function HeaderHome() {

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
            <HiStar
                size={22}
                color="#333"
                style={{ zIndex: 4, cursor: "pointer" }}
                onClick={() => router.push('/MyPokemons')}

            />
        </Flex>
    )
}