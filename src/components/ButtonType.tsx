import { Flex, FlexProps } from "@chakra-ui/react";
import Link from "next/link";

interface ButtonType extends FlexProps {
    type: string,
    color: string,
}

export function ButtonType({ type, color }: ButtonType) {
    return (
        <Flex
            as="a"
            bg={`${color}.500`}
            color="white"
            px="3"
            py="1"
            align="center"
            lineHeight="1rem"
            justify="center"
            fontSize="0.75rem"
            w="min-content"
            marginBottom="0.25rem"
            borderRadius="full"
            textAlign="center"
        >
            {type}
        </Flex>
    )
}