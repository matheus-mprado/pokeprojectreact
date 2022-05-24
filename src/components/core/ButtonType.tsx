import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { ColorsData } from "../../types/pokemon";

interface ButtonType extends FlexProps {
    type: string,
    color: ColorsData,
}

export function ButtonType({ type, color }: ButtonType) {
    return (
        <Flex
            as="a"
            bg={color.secondary}
            px="3"
            py="1"
            align="center"
            justify="center"
            w="min-content"
            marginBottom="0.25rem"
            borderRadius="full"
        >
            <Text
                textAlign="center"
                color={color.textColor}
                fontSize="0.75rem"
                lineHeight="1rem"
                textTransform="capitalize"
            >
                {type}
            </Text>
        </Flex>
    )
}