import { Button, ButtonProps, Flex, Text } from "@chakra-ui/react";

interface ButtonMenuProps extends ButtonProps {
    title: string;
    menuId: number;
    onCurrentMenu: number;
}

export function ButtonMenu({ title, onCurrentMenu, menuId, ...rest }: ButtonMenuProps) {
    return (
        <Button
            bg="transparent"
            p="0"
            mb="4"
            display="flex"
            flexDir="column"
            _focus={{
                bg: 'transparent'
            }}
            _active={{
                bg: 'transparent',
                outline: "none"
            }}
            _hover={{
                bg: 'transparent'
            }}
            {...rest}
        >
            <Text
                fontSize="0.75rem"
                color={menuId === onCurrentMenu ? "#020202" : "#555"}
                fontWeight="500"
                lineHeight="2rem"
            >
                {title}
            </Text>
            {onCurrentMenu === menuId &&
                <Flex
                    height="2px"
                    bg="#3498db"
                    w="100%"
                    px="2rem"
                />
            }
        </Button>
    )
}