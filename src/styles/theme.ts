import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    colors: {
        gray: {
            "950": "#050505",
            "800": "#121212",
            "790": "#212529",
            "750": "#222222",
            "700": "#333333",
            "600": "#5d5d5d",
            "500": "#7d7d7d",
            "400": "#a4a4a4",
            "300": "#afafaf",
            "200": "#dcdcdc",
            "150": "#eaeaea",
            "50": "#f6f6f6",
        },
        black: {
            "500": "#121212",
            "400": "#121212",
            "300": "5d5d5d"
        },
        brown: {
            "500": "#cd6133",
            "400": "#cd6133",
            "300": "#D9912B"
        },
        yellow: {
            "300": "#F7AB43"
        },
        white: {
            "500": "#eaeaea",
            "400": "#eaeaea"
        }
    },
    fonts: {
        heading: 'Poppins',
        body: "Poppins",
    },
    styles: {
        global: {
            body: {
                bg: 'white',
                color: 'gray.750'
            }
        }
    }
})