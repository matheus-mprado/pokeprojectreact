import { Flex, Image, Skeleton, Text } from "@chakra-ui/react";

export function ItemEvolve({ image, text }) {
    return (
        <Flex
            flexDir="column"
            align="center"
            position="relative"
            minW="7rem"
        >
            <Image
                src="/pokeball.svg"
                alt="Evolve"
                position="absolute"
                w="100px"
                left="0rem"
                top="-1.5rem"
            />
            {image ?
                <Image
                    src={image}
                    w="75px"
                    alt="Evolve"
                    zIndex={2}
                    mb="0.5rem"
                />
                :
                <Skeleton height='75px' w="75px" />
            }
            <Text
                fontWeight={500}
                textTransform="capitalize"
                color="#555"
                zIndex={2}
            >
                {text}
            </Text>
        </Flex>
    )
}