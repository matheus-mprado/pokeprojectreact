import { Text, TextProps } from "@chakra-ui/react";

interface TitleInfoProps extends TextProps {
    text: string;
}

export function TitleInfo({ text, ...rest }: TitleInfoProps) {

    function formatedText(text) {
        let textFormatted = '';

        switch (text) {
            case 'hp':
                textFormatted = "HP"
                return textFormatted;
            case 'special-attack':
                textFormatted = "Sp. Atk."
                return textFormatted
            case 'special-defense':
                textFormatted = "Sp. Def."
                return textFormatted
            default:
                return text;
        }
    }

    return (
        <Text
            fontSize="0.85rem"
            color="#999999"
            w="5.5rem"
            {...rest}
            textTransform="capitalize"
        >
            {formatedText(text)}
        </Text>
    )
}