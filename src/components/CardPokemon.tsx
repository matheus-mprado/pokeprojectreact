import { Button, Flex, GridItem, Image, Text } from "@chakra-ui/react"
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../service/api";
import { ColorsData, PokemonData, PokemonResultData, Specie } from "../types/pokemon";
import { ButtonType } from "./core/ButtonType";

interface CardPokemon {
    data: PokemonData
}

export function CardPokemon({ data }: CardPokemon) {

    const [specie, setSpecie] = useState<Specie>({} as Specie)
    const [pokemon, setPokemon] = useState<PokemonResultData>({} as PokemonResultData)
    const [colors, setColors] = useState<ColorsData>({} as ColorsData)
    const [image, setImage] = useState('')

    async function getSpecie(pokemonID: string) {

        try {
            const specie: Specie = (await api.get(`pokemon-species/${pokemonID}`)).data
            const info: PokemonData = (await api.get(`pokemon/${pokemonID}`)).data
            const image = info?.sprites.other["official-artwork"].front_default

            const data: PokemonResultData = {
                specie,
                info,
                image,
                id: String(info.id)
            }

            setPokemon(data)
            switchColor(specie)
            setSpecie(specie)
            setImage(image)

        } catch (err) {
            console.log(err)
        }
    }

    function switchColor(specie) {
        const pokemonColor = specie?.color.name;
        let textColor: string = 'gray.50';
        let iconColor: string = 'white';
        let primary = `${pokemonColor}.400`;
        let secondary = `${pokemonColor}.300`;
        let colorScheme = pokemonColor;

        if (pokemonColor === 'white') {
            secondary = 'gray.50'
            textColor = 'gray.700'
            iconColor = '#101010'
            colorScheme = 'gray'
        }
        const colors = {
            primary,
            secondary,
            textColor,
            iconColor,
            colorScheme
        }

        setColors(colors)
    }

    useEffect(() => {
        getSpecie(data.name)

    }, [])

    return (
        <Link href={`/pokemon/${data.name}`} passHref>
            <Flex
                as="a"
                w="100%"
                bg={colors.primary}
                borderRadius={12}
                flexDir="column"
                px="4"
                py="4"
                maxH="7rem"
                position="relative"
            >

                <Image
                    src="/pokeball.svg"
                    alt="pokeball"
                    position="absolute"
                    h="6rem"
                    bottom="-0.5rem"
                    right="-0.75rem"
                    opacity={0.2}
                />

                <Text
                    textTransform="capitalize"
                    color={colors.textColor}
                    fontWeight={600}
                    marginBottom="0.5rem"
                >
                    {pokemon.info?.name}
                </Text>

                <Flex
                    flexDir="row"
                    justify="space-between"
                >
                    <Flex
                        flexDir="column"
                    >
                        {pokemon.info?.types.map(item => {
                            return (
                                <ButtonType
                                    key={pokemon.image}
                                    color={colors}
                                    type={item.type.name}
                                />
                            )
                        })}
                    </Flex>



                    <Image
                        src={pokemon.image}
                        height="4rem"
                        marginRight="-0.5rem"
                        alt={pokemon.info?.name}
                    />
                </Flex>
            </Flex>
        </Link>
    )
}