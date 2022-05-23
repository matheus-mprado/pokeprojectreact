import { Flex, FlexProps, Text } from "@chakra-ui/react";

interface ButtonType extends FlexProps {
    type: string,
    color: string,
}

export function ButtonType({ type, color }: ButtonType) {
    return (
        <Flex
            as="a"
            bg={`${color}.300`}
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
                color="white"
                fontSize="0.75rem"
                lineHeight="1rem"
                textTransform="capitalize"
            >
                {type}
            </Text>
        </Flex>
    )
}