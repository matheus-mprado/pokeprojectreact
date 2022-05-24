import { Flex, Image, useDisclosure } from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { ColorsData, PokemonResultData } from "../../../../types/pokemon";
import { MenuList } from "../MenuList";
import { ModalAlreadyHavePokemon } from "../ModalAlreadyHavePokemon";
import { ModalGotchPokemon } from "../ModalGotchPokemon";
import { SuccessGotcha } from "../ModalGotchPokemon/SuccessGotcha";


interface BottomSheetProps {
    colors: ColorsData;
    pokemon: PokemonResultData
}

const POINTS_TO_DIFFICULT_GOTCHA = 3

export function BottonSheet({ colors, pokemon }: BottomSheetProps) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()

    const [namePokemonGotcha, setNamePokemonGotcha] = useState<null | string>(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isAlreadyExists, setIsAlreadyExists] = useState(false)

    function handleGotchaPokemon() {
        const captureRate = pokemon.specie?.capture_rate;

        let valueCapture = Math.floor(Math.random() * 101);

        if (verifyPokemons(pokemon.info?.name)) {
            return;
        }

        if (valueCapture <= (Math.ceil(captureRate / POINTS_TO_DIFFICULT_GOTCHA))) {
            setNamePokemonGotcha(pokemon.info?.name)
            setIsSuccess(true)
        }
    }

    function verifyPokemons(name: string) {
        const data = getMyPokemons()

        if (data !== null) {
            if (data.filter(item => item.name === name).length > 0) {
                setIsAlreadyExists(true)
                return true;
            } else {
                return false;
            }
        }
    }

    // Retorna a wish list do localstorage
    function getMyPokemons() {
        if (typeof window !== undefined) {
            const data = JSON.parse(localStorage.getItem("@PokemonProject:MyPokemons"))

            return data;
        }
    }


    function saveNewPokemon() {
        const data = {
            name: pokemon.info?.name,
            id: pokemon.id,
            nick: namePokemonGotcha
        }

        const dataList = getMyPokemons()

        if (dataList !== null) {
            if (dataList.filter(item => item.name === pokemon.info?.name).length > 0) {
                return
            } else {
                const newListItem = [...dataList, data]
                localStorage.setItem("@PokemonProject:MyPokemons", JSON.stringify(newListItem))
                router.push('/MyPokemons')
                // setExistInWishList(true)

            }
        } else {
            localStorage.setItem("@PokemonProject:MyPokemons", JSON.stringify([data]))
            // setExistInWishList(true)

        }
    }



    return (
        <Flex
            height="100%"
            bg="gray.50"
            borderTopRadius="2rem"
            mt="15rem"
            px="2rem"
            flexDir="column"
            position="relative"
        >
            {isSuccess &&
                <SuccessGotcha
                    colors={colors}
                    onOpen={onOpen}
                    onIsSuccess={setIsSuccess}
                />
            }
            <Image
                src={pokemon.image}
                alt={pokemon.info?.name}
                w="250px"
                objectFit="contain"
                position="absolute"
                alignSelf="center"
                top="-12rem"
                onClick={handleGotchaPokemon}
            />

            <MenuList
                colors={colors}
                pokemon={pokemon}
            />

            <ModalAlreadyHavePokemon
                isAlreadyExists={isAlreadyExists}
                setIsAlreadyExists={setIsAlreadyExists}
            />

            <ModalGotchPokemon
                isOpen={isOpen}
                onClose={onClose}
                onSetNamePokemon={setNamePokemonGotcha}
                namePokemon={namePokemonGotcha}
                colors={colors}
                onClick={saveNewPokemon}
            />

        </Flex>
    )
}