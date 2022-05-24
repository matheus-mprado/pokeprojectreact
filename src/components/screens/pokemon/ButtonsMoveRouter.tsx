import { Button } from "@chakra-ui/react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

interface ButtonsMoveRouterProps {
    onPrevPokemon: () => void;
    onNextPokemon: () => void;
}

export function ButtonsMoveRouter({ onPrevPokemon, onNextPokemon }: ButtonsMoveRouterProps) {
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
                onClick={onPrevPokemon}
                _hover={{
                    bg:'transparent'
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
                    bg:'transparent'
                }}
                right="0"
                onClick={onNextPokemon}
            >
                <HiArrowRight size={32} color="white" />
            </Button>
        </>
    )
}