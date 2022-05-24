import { Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { HiArrowLeft, HiArrowRight, HiOutlineArrowSmLeft, HiOutlineStar, HiStar } from 'react-icons/hi'
import { ButtonMenu } from "../../components/core/ButtonMenu";
import { ButtonType } from "../../components/core/ButtonType";
import { AboutPokemon } from "../../components/menu/AboutPokemon";
import { BaseStatsPokemon } from "../../components/menu/BaseStatsPokemon";
import { EvolutionPokemon } from "../../components/menu/EvolutionPokemon";
import { ButtonsMoveRouter } from "../../components/screens/pokemon/ButtonsMoveRouter";
import { api } from "../../service/api";
import { ColorsData, PokemonData, PokemonResultData, Specie } from "../../types/pokemon";
import { formattedIDPokemon } from "../../utils/formattedIDPokemon";
import { switchColor } from "../../utils/switchColor";

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
    const [existInWishList, setExistInWishList] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [colors, setColors] = useState<ColorsData>({} as ColorsData)

    const { id } = router.query

    async function getPokemonData() {
        setPokemon(null)
        setIsLoading(true)

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

            if (typeof window !== undefined) {
                const data = localStorage.getItem('@PokemonProject:PokemonWishList');
                const JSONdata = JSON.parse(data)

                if (JSONdata !== null) {
                    if (JSONdata.filter(item => item.name === info.name).length > 0) {
                        setExistInWishList(true)
                    }
                }

            }

            setColors(switchColor(specie))
            setPokemon(pokemon)

        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }


    function getWishList() {
        if (typeof window !== undefined) {
            const data = JSON.parse(localStorage.getItem("@PokemonProject:PokemonWishList"))

            return data;
        }
    }

    function handleRemoveFromWishList(name: string) {
        const data = getWishList();

        const newList = data.filter(item => item.name !== name);
        if (typeof window !== undefined) {
            localStorage.setItem("@PokemonProject:PokemonWishList", JSON.stringify(newList))
            setExistInWishList(false)
        }
    }

    function handleAddWishListPokemons(name: string, id: string) {
        const data = {
            name,
            id
        }

        if (typeof window !== undefined) {

            const dataList = getWishList()

            if (dataList !== null) {
                if (dataList.filter(item => item.name === name).length > 0) {
                    return
                } else {
                    const newListItem = [...dataList, data]
                    localStorage.setItem("@PokemonProject:PokemonWishList", JSON.stringify(newListItem))
                    setExistInWishList(true)

                }
            } else {
                localStorage.setItem("@PokemonProject:PokemonWishList", JSON.stringify([data]))
                setExistInWishList(true)

            }
        }
    }

    function handleGoBack() {
        router.push('/')
    }

    function handleNextPokemon() {
        const nextPokemonID = Number(pokemon.id) + 1

        router.push(`/pokemon/${nextPokemonID}`)
    }


    function handlePrevPokemon() {
        const nextPokemonID = Number(pokemon.id) - 1

        if (nextPokemonID === 0) {
            return;
        }
        router.push(`/pokemon/${nextPokemonID}`)
    }


    useEffect(() => {
        setExistInWishList(false)
    }, [id])

    useLayoutEffect(() => {
        getPokemonData()
        getWishList()
    }, [router.query.id])

    if (!pokemon) {
        return (
            <Flex
                h="100vh"
                w="100%"
                align="center"
                justify="center"
            >
                <Spinner/>
            </Flex>)
    }

    return (
        <>
            <Head>
                <title>{pokemon.info?.name.toUpperCase()} - {formattedIDPokemon(Number(pokemon.id))}</title>
            </Head>
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
                    {existInWishList ?
                        <HiStar size={22} color={colors.iconColor} onClick={() => handleRemoveFromWishList(pokemon.info.name)} />
                        :
                        <HiOutlineStar size={22} color={colors.iconColor} onClick={() => handleAddWishListPokemons(pokemon.info.name, pokemon.id)} />
                    }
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
                            pokemonName={pokemon.info?.name}
                            evolutionChain={pokemon.specie?.evolution_chain}
                        />
                    }
                </Flex>

                <ButtonsMoveRouter
                    onPrevPokemon={handlePrevPokemon}
                    onNextPokemon={handleNextPokemon}
                />

            </Flex>
        </>
    )
}
