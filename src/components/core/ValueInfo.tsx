import { Text, TextProps } from "@chakra-ui/react";

interface ValueInfoProps extends TextProps {
    value: string | number;
}

export function ValueInfo({ value, ...rest }: ValueInfoProps) {
    return (
        <Text
            fontSize="0.85rem"
            color="#555"
            fontWeight={600}
            {...rest}
        >
            {value}
        </Text>
    )
}