import { Flex, Text } from "@chakra-ui/react"
import { PokemonResultData } from "../../../types/pokemon"
import { InfoText } from "./InfoText"

interface AboutPokemon {
    pokemon: PokemonResultData
}

export function AboutPokemon({ pokemon }: AboutPokemon) {
    return (
        <Flex
            flexDir="column"
        >
            <Text
                mb="2rem"
                fontSize="0.85rem"
                color="#555"
                fontWeight={400}
            >
                {pokemon.specie?.flavor_text_entries[9].flavor_text}
            </Text>
            <InfoText title="Species" info={pokemon.info?.species.name} />
            <InfoText title="Height" info={`${pokemon.info?.height / 10} m`} />
            <InfoText title="Weight" info={`${pokemon.info?.weight / 10} kg`} />
            <InfoText title="Abilities" abilities={pokemon.info?.abilities} />
        </Flex>
    )
}