import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next"
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { HiArrowLeft, HiArrowRight, HiOutlineArrowSmLeft, HiOutlineStar } from 'react-icons/hi'
import { ButtonMenu } from "../../components/ButtonMenu";
import { ButtonType } from "../../components/ButtonType";
import { AboutPokemon } from "../../components/menu/AboutPokemon";
import { BaseStatsPokemon } from "../../components/menu/BaseStatsPokemon";
import { EvolutionPokemon } from "../../components/menu/EvolutionPokemon";
import { PokeServices } from "../../service/PokeServices";
import { PokemonResultData } from "../../types/pokemon";

interface PokemonProps {
    pokemon: PokemonResultData;
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

export default function Pokemon({ pokemon }: PokemonProps) {

    const router = useRouter()

    const [currentMenu, setCurrentMenu] = useState(1)
    const [currentPokemonOrder, setCurrentPokemonOrder] = useState<null | number>(null)



    function handleGetNextPokemon() {
        router.push({
            pathname: '/pokemon/[id]',
            query: { id: currentPokemonOrder + 1 }
        })
    }

    async function handleGetPrevPokemon() {
        router.push({
            pathname: '/pokemon/[id]',
            query: { id: currentPokemonOrder - 1 }
        })
    }

    function formatedIDPokemon(id: number) {
        let idFormatted = '';
        if (id < 10) {
            idFormatted = `#00${id}`
        } else if (id < 100 && id >= 10) {
            idFormatted = `#0${id}`
        }

        return idFormatted;
    }

    function handleGoBack() {
        router.push("/")
    }

    useEffect(() => {
        console.clear()
        console.log("a")
        setCurrentPokemonOrder(pokemon.pokemon.infos.id)
    }, [router.asPath])

    if (!pokemon) {
        return null;
    }

    return (
        <Flex
            bg={`${pokemon.pokemon.species.color.name}.400`}
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
                <HiOutlineArrowSmLeft size={28} color="white" onClick={handleGoBack} />
                <HiOutlineStar size={22} color="white" />
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
                        color="gray.50"
                        fontSize="1.75rem"
                    >
                        {pokemon.pokemon.infos.name}
                    </Text>

                    <Text
                        as="h3"
                        color="gray.50"
                    >
                        {formatedIDPokemon(pokemon.pokemon.infos.id)}
                    </Text>
                </Flex>

                <Flex
                    gap="0.5rem"
                    mt="1rem"
                >
                    {pokemon.pokemon.infos.types.map(item => {
                        return (
                            <ButtonType
                                key={`${pokemon.pokemon.infos.name}.type`}
                                color={`${pokemon.pokemon.species.color.name}`}
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
                    alt={pokemon.pokemon.infos.name}
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
                        color={pokemon.pokemon.species.color.name}
                        stats={pokemon.pokemon.infos.stats}
                    />
                }

                {currentMenu === 3 &&
                    <EvolutionPokemon evolutionChain={pokemon.pokemon.species.evolution_chain} />
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
                onClick={handleGetPrevPokemon}
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
                onClick={handleGetNextPokemon}
            >
                <HiArrowRight size={32} color="white" />
            </Button>

        </Flex>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params;

    const pokeApi = new PokeServices()
    let pokemon = {};

    try {
        pokemon = await pokeApi.getDataPokemon(Number(id))
    } catch (err) {
        console.log(err)
    }

    return {
        props: {
            pokemon
        },

    }
}