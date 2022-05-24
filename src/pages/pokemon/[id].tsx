import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next"
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { HiArrowLeft, HiArrowRight, HiOutlineArrowSmLeft, HiOutlineStar } from 'react-icons/hi'
import { ButtonMenu } from "../../components/core/ButtonMenu";
import { ButtonType } from "../../components/core/ButtonType";
import { AboutPokemon } from "../../components/menu/AboutPokemon";
import { BaseStatsPokemon } from "../../components/menu/BaseStatsPokemon";
import { EvolutionPokemon } from "../../components/menu/EvolutionPokemon";
import { api } from "../../service/api";
import { PokeServices } from "../../service/PokeServices";
import { ColorsData, PokemonData, PokemonResultData, Specie } from "../../types/pokemon";

interface PokemonProps {
    data: PokemonResultData;
}



const menuList = [
    {
        id: 1,
        title: "About",
    }, {
        id: 2,
        title: "Base Stats",
    },
    {
        id: 3,
        title: "Evolution",
    }
];

export default function Pokemon({ }: PokemonProps) {

    const router = useRouter()

    const [currentMenu, setCurrentMenu] = useState(1)
    const [pokemon, setPokemon] = useState<PokemonResultData>({} as PokemonResultData)
    const [isLoading, setIsLoading] = useState(false)
    const [colors, setColors] = useState<ColorsData>({} as ColorsData)

    async function getPokemonData() {
        setPokemon(null)
        setIsLoading(true)

        const { id } = router.query

        try {
            const info: PokemonData = (await api.get(`pokemon/${id}`)).data
            const specie: Specie = (await api.get(`pokemon-species/${id}`)).data
            const image = info?.sprites.other["official-artwork"].front_default

            const pokemon = {
                info,
                specie,
                image,
                id: String(info.id)
            }

            switchColor(specie)
            setPokemon(pokemon)

        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    function handleGoBack() {
        router.push('/')
    }

    function formatedIDPokemon(id: number) {
        let idFormatted = '';
        if (id < 10) {
            idFormatted = `#00${id}`
        } else if (id < 100 && id >= 10) {
            idFormatted = `#0${id}`
        } else {
            idFormatted = `#${id}`
        }

        return idFormatted;
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

    function handleNextPokemon() {
        const nextPokemonID = Number(pokemon.id) + 1

        router.push(`/pokemon/${nextPokemonID}`)
    }


    function handlePrevPokemon() {
        const nextPokemonID = Number(pokemon.id) - 1

        router.push(`/pokemon/${nextPokemonID}`)
    }



    useEffect(() => {
        getPokemonData()
    }, [router.query.id])

    if (!pokemon) {
        return null
    }

    return (
        <Flex
            bg={colors.primary}
            h="100vh"
            w="100%"
            flexDir="column"
        >
            <Flex
                w="100%"
                maxHeight="5rem"
                align="center"
                justifyContent="space-between"
                px="6"
                pt="8"

            >
                <HiOutlineArrowSmLeft size={28} color={colors.iconColor} onClick={handleGoBack} />
                <HiOutlineStar size={22} color={colors.iconColor} />
            </Flex>

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
                        {formatedIDPokemon(pokemon.info?.id)}
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

            <Image
                src="/pokeball.svg"
                alt="pokeball"
                position="absolute"
                opacity={0.2}
                height={["18rem", "28rem"]}
                top={["22.5%", "12.5%"]}
                left={["4rem", "5rem"]}
            />

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

                <Flex
                    mt="3rem"
                    mb="0.5rem"
                    justifyContent="space-between"
                >
                    {menuList.map(item => {
                        return (
                            <ButtonMenu
                                key={item.id}
                                title={item.title}
                                onCurrentMenu={currentMenu}
                                menuId={item.id}
                                onClick={() => setCurrentMenu(item.id)}
                            />
                        )
                    })}
                </Flex>

                {currentMenu === 1 &&
                    <AboutPokemon
                        pokemon={pokemon}
                    />
                }
                {currentMenu === 2 &&
                    <BaseStatsPokemon
                        color={colors}
                        stats={pokemon.info?.stats}
                    />
                }

                {currentMenu === 3 &&
                    <EvolutionPokemon
                        evolutionChain={pokemon.specie?.evolution_chain}
                    />
                }
            </Flex>

            <Button
                position="absolute"
                top="40%"
                bg="transparent"
                _focus={{
                    outline: 'none'
                }}
                left="0"
                onClick={handlePrevPokemon}
            >
                <HiArrowLeft size={32} color="white" />
            </Button>

            <Button
                position="absolute"
                top="40%"
                bg="transparent"
                outline="none"
                _focus={{
                    outline: 'none'
                }}
                right="0"
                onClick={handleNextPokemon}
            >
                <HiArrowRight size={32} color="white" />
            </Button>

        </Flex>
    )
}
