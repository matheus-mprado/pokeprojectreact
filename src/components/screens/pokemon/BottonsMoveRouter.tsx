import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

interface ButtonsMoveRouterProps {
    currentPokemonID: string;
}

export function ButtonsMoveRouter({ currentPokemonID }: ButtonsMoveRouterProps) {

    const router = useRouter()

    function handleNextPokemon() {
        const nextPokemonID = Number(currentPokemonID) + 1

        router.push(`/pokemon/${nextPokemonID}`)
    }


    function handlePrevPokemon() {
        const nextPokemonID = Number(currentPokemonID) - 1

        if (nextPokemonID === 0) {
            return;
        }
        router.push(`/pokemon/${nextPokemonID}`)
    }

    return (
        <>
            <Button
                position="absolute"
                top="40%"
                bg="transparent"
                _focus={{
                    outline: 'none'
                }}
                left="0"
                onClick={handlePrevPokemon}
                _hover={{
                    bg: 'transparent'
                }}
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
                _hover={{
                    bg: 'transparent'
                }}
                right="0"
            onClick={handleNextPokemon}
            >
                <HiArrowRight size={32} color="white" />
            </Button>
        </>
    )
}