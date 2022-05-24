import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

interface LinkMenu {
    href: string;
    title: string;
}

export function LinkMenu({ href, title }) {
    return (
        <Link href={href} passHref>
            <Flex
                as="a"
                px="6"
                py="4"
                align="center"
                justify="space-between"
                borderBottom="1px solid"
                borderBottomColor="gray.400"
                color="#7d7d7d"
            >
                <Text>
                    {title}
                </Text>
                <MdKeyboardArrowRight
                    size="18"
                    color="#7d7d7d"
                />
            </Flex>
        </Link>
    )
}