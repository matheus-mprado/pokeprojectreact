import { Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next"
import { PokeServices } from "../../service/PokeServices";
import { PokemonResultData } from "../../types/pokemon";

interface PokemonProps {
    pokemon: PokemonResultData;
}

export default function Pokemon({ pokemon }: PokemonProps) {

    console.log(pokemon)

    return (
        <Flex
            bg={`${pokemon.pokemon.species.color.name}.400`}
            h="100vh"
            w="100%"
        >

        </Flex>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params;

    const pokeApi = new PokeServices()

    const pokemon = await pokeApi.getDataPokemon(Number(id))
    return {
        props: {
            pokemon
        },

    }
}