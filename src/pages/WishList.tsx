import { Flex, Grid, Image, Skeleton, Text } from "@chakra-ui/react"
import { Router, useRouter } from "next/router"
import { useEffect, useState } from "react"
import { HiOutlineArrowSmLeft, HiOutlineStar } from "react-icons/hi"
import { CardPokemon } from "../components/CardPokemon"

export default function WishList() {

    const router = useRouter()

    const [wishList, setWishList] = useState([])

    function getWishList() {
        if (typeof window !== undefined) {
            const data = JSON.parse(localStorage.getItem("@PokemonProject:PokemonWishList"))
            if (data !== null) {
                setWishList(data)
            }
        }
    }

    function handleGoBack(){
        router.push('/')
    }

    useEffect(() => {
        getWishList()
    }, [])

    return (
        <Flex
            w="100%"
            px="6"
            py="12"
            flexDir="column"
            __css={{
                'contentVisibility': 'auto'
            }}
        >
            <Flex
                w="100%"
                justify="space-between"
                align="center"
            >
                <HiOutlineArrowSmLeft size={28} color="#333" onClick={handleGoBack} />
                <Text
                    fontSize="2xl"
                    mt="1rem"
                    fontWeight={600}
                    marginBottom="2rem"
                >
                    Wish List
                </Text>

            </Flex>

            <Image
                src="/pokeball.svg"
                alt="pokeball"
                position="absolute"
                right="-4rem"
                zIndex={-1}
                top="-2rem"
            />

            <Grid
                templateColumns='repeat(2,1fr)'
                gap={2}
                w="100%"
            >
                {
                    wishList.length > 0 ?
                        wishList?.map(item => {
                            return (
                                <CardPokemon key={item.name} data={item} />
                            )
                        })
                        :
                        <>
                            <Skeleton w="165px" h="115px" borderRadius={8} />
                            <Skeleton w="165px" h="115px" borderRadius={8} />
                            <Skeleton w="165px" h="115px" borderRadius={8} />
                            <Skeleton w="165px" h="115px" borderRadius={8} />
                            <Skeleton w="165px" h="115px" borderRadius={8} />
                        </>
                }
            </Grid>
        </Flex>
    )
}