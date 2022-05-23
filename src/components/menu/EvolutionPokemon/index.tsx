import { Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { PokeServices } from "../../../service/PokeServices";
import { RowEvolve } from "./RowEvolve";

interface EvolutionPokemonProps {
    evolutionChain: {
        url: string;
    }
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
    chain: evolve
}


export function EvolutionPokemon({ evolutionChain }: EvolutionPokemonProps) {

    const pokeServices = new PokeServices()

    const [evolution, setEvolution] = useState<evolutionData>({} as evolutionData)
    const [pokemonImages, setPokemonImages] = useState<string[]>([])

    async function getEvolutionChain() {
        const resultEvolution = (await axios.get(evolutionChain.url)).data
        setEvolution(resultEvolution)
    }

    async function getImages() {
        let pokemonGetImages = [];

        if (evolution.chain.evolves_to[0].species.name) {
            let pokemonOne = await pokeServices.getImageFromSpecies(evolution.chain.species.name)
            let pokemonTwo = await pokeServices.getImageFromSpecies(evolution.chain.evolves_to[0].species.name)

            pokemonGetImages.push(pokemonOne, pokemonTwo)
        }

        if (evolution.chain.evolves_to[0].evolves_to[0].species.name) {
            let pokemonTree = await pokeServices.getImageFromSpecies(evolution.chain.evolves_to[0].evolves_to[0].species.name)

            pokemonGetImages.push(pokemonTree)
        }


        setPokemonImages(pokemonGetImages)
    }

    useEffect(() => {
        getEvolutionChain()
       
    }, [])

    useEffect(()=>{
        if (evolution.chain) {
            getImages()
        }
    },[])

    if (!evolution.chain) {
        return null;
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

            {evolution.chain.evolves_to[0].species.name &&

                <RowEvolve
                    firstImage={pokemonImages[0]}
                    firstName={evolution.chain.species.name}
                    lvlEvolve={evolution.chain.evolves_to[0].evolution_details[0].min_level}
                    secoundImage={pokemonImages[1]}
                    secoundName={evolution.chain.evolves_to[0].species.name}
                />

            }

            {evolution.chain.evolves_to[0].evolves_to[0].species.name &&
                <RowEvolve
                    firstImage={pokemonImages[1]}
                    firstName={evolution.chain.evolves_to[0].species.name}
                    lvlEvolve={evolution.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level}
                    secoundImage={pokemonImages[2]}
                    secoundName={evolution.chain.evolves_to[0].evolves_to[0].species.name}
                />
            }

        </Flex >
    )
}