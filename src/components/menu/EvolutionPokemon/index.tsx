import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../../service/api";
import { PokeServices } from "../../../service/PokeServices";
import { RowEvolve } from "./RowEvolve";

interface EvolutionPokemonProps {
    evolutionChain: {
        url: string;
    }
    pokemonName: string;
}


type evolve = {
    evolves_to: [{
        evolution_details: [{ min_level, item }];
        evolves_to: [{
            evolution_details: [{ min_level, item }];
            species: {
                name: string;
                url: string;
            }
        }]
        species: {
            name: string;
            url: string;
        }
    }]
    species: {
        name: string;
        url: string;
    }
}

type evolutionData = {
    chain: evolve;
}


export function EvolutionPokemon({ evolutionChain, pokemonName }: EvolutionPokemonProps) {

    const pokeServices = new PokeServices()

    const [evolution, setEvolution] = useState<evolutionData>({} as evolutionData)
    const [pokemonImages, setPokemonImages] = useState<string[]>([])

    async function getEvolutionChain() {
        const resultEvolution = (await axios.get(evolutionChain.url)).data
        setEvolution(resultEvolution)
    }

    async function getImages() {
        let pokemonGetImages = [];

        if (evolution.chain.evolves_to[0]?.species.name) {
            let evolveTwo = evolution.chain.evolves_to[0];
            if (evolution.chain.evolves_to?.length > 2) {
                if (evolution.chain.evolves_to.filter(item => item.species.name === pokemonName).length === 0) {
                    evolveTwo = evolution.chain.evolves_to[0]
                } else {
                    evolveTwo = evolution.chain.evolves_to.filter(item => item.species.name === pokemonName)[0]
                }
            }

            let pokemonOne = await pokeServices.getImageFromSpecies(evolution.chain.species.name)
            let pokemonTwo = await pokeServices.getImageFromSpecies(evolveTwo?.species.name)

            pokemonGetImages.push(pokemonOne, pokemonTwo)
        }

        if (evolution.chain.evolves_to[0]?.evolves_to[0]?.species.name) {
            let pokemonTree = await pokeServices.getImageFromSpecies(evolution.chain.evolves_to[0].evolves_to[0].species.name)

            pokemonGetImages.push(pokemonTree)
        }


        setPokemonImages(pokemonGetImages)
    }

    useEffect(() => {
        getEvolutionChain()

    }, [evolutionChain])

    useEffect(() => {
        if (evolution.chain) {
            getImages()
        }
    }, [evolution])

    if (!evolution.chain) {
        return (
            <Flex
                h="50%"
                w="100%"
                align="center"
                justify="center"
            >
                <Spinner />
            </Flex>
        )
    }

    return (
        <Flex
            flexDir="column"
        >
            <Text
                fontWeight={600}
                color="#333"
                mb="1rem"
            >
                Evolution Chain
            </Text>

            {evolution.chain?.evolves_to[0]?.species.name ?
                <>
                    <RowEvolve
                        firstImage={pokemonImages[0]}
                        firstName={evolution.chain.species.name}
                        howToEvolve={evolution.chain?.evolves_to[0]?.evolution_details[0]}
                        secoundImage={pokemonImages[1]}
                        secoundName={evolution.chain.evolves_to[0].species.name}
                    />

                    {evolution.chain?.evolves_to[0]?.evolves_to[0]?.species.name &&
                        <RowEvolve
                            firstImage={pokemonImages[1]}
                            firstName={evolution.chain.evolves_to[0].species.name}
                            howToEvolve={evolution.chain?.evolves_to[0]?.evolves_to[0]?.evolution_details[0]}
                            secoundImage={pokemonImages[2]}
                            secoundName={evolution.chain.evolves_to[0].evolves_to[0].species.name}
                        />
                    }
                </>
                :
                <Text>
                    This pokemon not have evolution 😢
                </Text>

            }



        </Flex >
    )
}