import { Flex, Image, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { ColorsData, PokemonResultData } from "../../../types/pokemon"
import { formattedIDPokemon } from "../../../utils/formattedIDPokemon";
import { ButtonType } from "../../core/ButtonType"

interface InfosPokemon {
    colors: ColorsData;
    pokemon: PokemonResultData;
}

export function InfosPokemon({ colors, pokemon }: InfosPokemon) {

    const [haveThisPokemon, setHaveThisPokemon] = useState(false)
    const [nickName,setNickName] = useState<null | string>(null)

    // Retorna a wish list do localstorage
    function getMyPokemons() {
        if (typeof window !== undefined) {
            const data = JSON.parse(localStorage.getItem("@PokemonProject:MyPokemons"))
         
            return data;
        }
    }

    function verifyPokemons(name: string) {
        const data = getMyPokemons()

        if (data !== null) {
            if (data.filter(item => item.name === name).length > 0) {
                const myPokemon = data.filter(item => item.name === name);
                setNickName(myPokemon[0].nick)

                return true;
            } else {
                return false;
            }
        }
    }

    useEffect(() => {
        if (verifyPokemons(pokemon.info?.name)) {
            setHaveThisPokemon(true)
        }
    }, [])

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
                    {nickName ? nickName : pokemon.info?.name}
                </Text>

                <Text
                    as="h3"
                    color={colors.textColor}
                >
                    {formattedIDPokemon(pokemon.info?.id)}
                </Text>
            </Flex>

            <Flex
                justify="space-between"
                mt="1rem"
            >
                <Flex
                    gap="0.5rem"
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
                {haveThisPokemon &&
                    <Image
                        src="/ball.png"
                        alt="have this pokemon"
                        w="25px"
                        objectFit="cover"
                    />
                }
            </Flex>

        </Flex>

    )
}