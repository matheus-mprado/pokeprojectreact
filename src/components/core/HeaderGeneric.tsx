import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HiOutlineArrowSmLeft } from "react-icons/hi";

interface HeaderGeneric {
    title: string;
}

export function HeaderGeneric({ title }: HeaderGeneric) {

    const router = useRouter()

    function handleGoBack() {
        router.push('/')
    }

    return (
        <Flex
            w="100%"
            justify="space-between"
            align="center"
        >
            <HiOutlineArrowSmLeft size={28} color="#333" onClick={handleGoBack} style={{ cursor: 'pointer' }} />
            <Text
                fontSize="2xl"
                mt="1rem"
                fontWeight={600}
                marginBottom="2rem"
            >
                {title}
            </Text>

        </Flex>
    )
}