import Head from "next/head";
import { Flex, Image, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ButtonsMoveRouter } from "../../components/screens/pokemon/BottonsMoveRouter";
import { BottonSheet } from "../../components/screens/pokemon/ButtonSheet";
import { HeaderPokemon } from "../../components/screens/pokemon/HeaderPokemon";
import { InfosPokemon } from "../../components/screens/pokemon/InfosPokemon";


import { api } from "../../service/api";

import { ColorsData, PokemonData, PokemonResultData, Specie } from "../../types/pokemon";

import { formattedIDPokemon } from "../../utils/formattedIDPokemon";
import { switchColor } from "../../utils/switchColor";

interface PokemonProps {
    data: PokemonResultData;
}



export default function Pokemon({ }: PokemonProps) {

    const router = useRouter()

    const [pokemon, setPokemon] = useState<PokemonResultData>({} as PokemonResultData)
    const [isLoading, setIsLoading] = useState(false)
    const [existInWishList, setExistInWishList] = useState(false)
    const [colors, setColors] = useState<ColorsData>({} as ColorsData)

    const { id } = router.query


    // Busca o pokemon e sua specie e formata a imagem de acordom com a ID ou nome do pokemon
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

            verifyWishList(info.name)

            setColors(switchColor(specie))
            setPokemon(pokemon)

        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    // Retorna a wish list do localstorage
    function getWishList() {
        if (typeof window !== undefined) {
            const data = JSON.parse(localStorage.getItem("@PokemonProject:PokemonWishList"))

            return data;
        }
    }

    // Verifica se o pokemon esta na wish list no localstorage
    function verifyWishList(name: string) {
        const data = getWishList()

        if (data !== null) {
            if (data.filter(item => item.name === name).length > 0) {
                setExistInWishList(true)
            }
        }
    }

    useEffect(() => {
        setExistInWishList(false)
        getPokemonData()
        getWishList()
    }, [id])

    if (!pokemon) {
        return (
            <Flex
                h="100vh"
                w="100%"
                align="center"
                justify="center"
            >
                <Spinner />
            </Flex>
        )
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
                <HeaderPokemon
                    colors={colors}
                    pokemon={pokemon}
                    existInWishList={existInWishList}
                    getWishList={getWishList}
                    setExistInWishList={setExistInWishList}
                />

                <InfosPokemon
                    colors={colors}
                    pokemon={pokemon}
                />


                <Image
                    src="/pokeball.svg"
                    alt="pokeball"
                    position="absolute"
                    opacity={0.2}
                    height={["18rem", "28rem"]}
                    top={["22.5%", "12.5%"]}
                    left={["4rem", "5rem"]}
                />

                <BottonSheet
                    colors={colors}
                    pokemon={pokemon}
                />

                <ButtonsMoveRouter
                    currentPokemonID={pokemon.id}
                />

            </Flex>
        </>
    )
}
