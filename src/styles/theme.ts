import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    colors:{
        gray:{
            "950":"#050505",
            "800":"#121212",
            "790":"#212529",
            "750":"#222222",
            "700":"#333333",
            "600":"#5d5d5d",
            "500":"#7d7d7d",
            "400":"#a4a4a4",
            "300":"#afafaf",
            "200":"#dcdcdc",
            "150":"#eaeaea",
            "50" :"#f6f6f6",
        },
    },
    fonts:{
        heading:'Poppins',
        body:"Poppins",  
    },
    styles:{
        global:{
            body:{
                bg:'white',
                color:'gray.750'
            }
        }
    }
})