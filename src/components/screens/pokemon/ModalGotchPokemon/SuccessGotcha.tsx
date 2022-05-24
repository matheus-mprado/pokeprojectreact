import { Button, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ColorsData } from "../../../../types/pokemon";


interface SuccessGotcha {
    colors: ColorsData
    onOpen: () => void;
    onIsSuccess: (value: boolean) => void;
}

export function SuccessGotcha({ colors, onOpen, onIsSuccess }: SuccessGotcha) {

    const ImageMotion = motion(Image)

    function handleNextStep() {
        onIsSuccess(false)
        onOpen()
    }

    return (
        <Flex
            zIndex={5}
            flexDir="column"
            alignSelf="center"
            w="fit-content"
            align="flex-end"
        >
            <ImageMotion
                src="/ball.png"
                mt="-12rem"
                height="18rem"
                initial="initial"
                animate="animate"
                variants={{
                    initial: {
                        opacity: 0,
                    },
                    animate: {
                        opacity: 1,
                    },
                }}
            />
            <Button
                colorScheme={colors.colorScheme}
                onClick={handleNextStep}
            >
                Next
            </Button>
        </Flex>
    )
}