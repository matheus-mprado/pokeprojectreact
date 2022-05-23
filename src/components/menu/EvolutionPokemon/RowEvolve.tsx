import { Flex, Text, Image } from "@chakra-ui/react";
import { ItemEvolve } from "./ItemEvolve";
import { IoIosArrowRoundForward } from 'react-icons/io'

export function RowEvolve({ firstImage, firstName, secoundImage, secoundName, lvlEvolve }) {
    return (
        <Flex
            w="100%"
            align="center"
            justify="space-between"
            mb="1rem"
        >
            <ItemEvolve
                image={firstImage}
                text={firstName}
            />
            <Flex
                flexDir="column"
                align="center"
                w="100%"
            >
                <IoIosArrowRoundForward size="28" color="#eaeaea" />
                <Text
                    fontWeight={600}
                    color="#222"
                    fontSize="small"
                >
                    Lvl {lvlEvolve}
                </Text>
            </Flex>
            <ItemEvolve
                image={secoundImage}
                text={secoundName}
            />
        </Flex>
    )
}