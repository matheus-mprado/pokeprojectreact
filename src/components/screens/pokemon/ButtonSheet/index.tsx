import { Flex, Image } from "@chakra-ui/react";
import { ColorsData, PokemonResultData } from "../../../../types/pokemon";
import { MenuList } from "../MenuList";


interface BottomSheetProps {
    colors: ColorsData;
    pokemon: PokemonResultData
}

export function BottonSheet({ colors, pokemon }: BottomSheetProps) {
    return (
        <Flex
            height="100%"
            bg="gray.50"
            borderTopRadius="2rem"
            mt="15rem"
            px="2rem"
            flexDir="column"
            position="relative"
        >
            <Image
                src={pokemon.image}
                alt={pokemon.info?.name}
                w="250px"
                objectFit="contain"
                position="absolute"
                alignSelf="center"
                top="-12rem"
            />

            <MenuList
                colors={colors}
                pokemon={pokemon}
            />
        </Flex>
    )
}