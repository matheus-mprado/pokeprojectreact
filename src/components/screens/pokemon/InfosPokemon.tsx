import { Flex, Text } from "@chakra-ui/react"
import { ColorsData, PokemonResultData } from "../../../types/pokemon"
import { formattedIDPokemon } from "../../../utils/formattedIDPokemon";
import { ButtonType } from "../../core/ButtonType"

interface InfosPokemon {
    colors: ColorsData;
    pokemon: PokemonResultData;
}

export function InfosPokemon({ colors, pokemon }) {
    return (
        <Flex
            px="8"
            mt="6"
            flexDir="column"
        >
            <Flex
                align="baseline"
                justify="space-between"
                w="100%"
            >
                <Text
                    as="h2"
                    textTransform="capitalize"
                    fontWeight={600}
                    color={colors.textColor}
                    fontSize="1.75rem"
                >
                    {pokemon.info?.name}
                </Text>

                <Text
                    as="h3"
                    color={colors.textColor}
                >
                    {formattedIDPokemon(pokemon.info?.id)}
                </Text>
            </Flex>

            <Flex
                gap="0.5rem"
                mt="1rem"
            >
                {pokemon.info?.types.map(item => {
                    return (
                        <ButtonType
                            key={`${pokemon.info?.name}.type`}
                            color={colors}
                            type={item.type.name}
                        />
                    )
                })}
            </Flex>

        </Flex>

    )
}