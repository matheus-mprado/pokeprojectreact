import { Flex, Grid, Image, Skeleton, Text } from "@chakra-ui/react"
import { Router, useRouter } from "next/router"
import { useEffect, useState } from "react"
import { HiOutlineArrowSmLeft, HiOutlineStar } from "react-icons/hi"
import { CardPokemon } from "../components/core/CardPokemon"
import { SkeletonCardPokemon } from "../components/core/SkeletonCardPokemon"
import { HeaderWishList } from "../components/screens/wishList/HeaderWishList"

export default function WishList() {


    const [wishList, setWishList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // função para buscar pokemons no localstorage
    function getWishList() {
        setIsLoading(true)
        if (typeof window !== undefined) {
            const data = JSON.parse(localStorage.getItem("@PokemonProject:PokemonWishList"))
            if (data !== null) {
                setWishList(data)
            }
        }
        setIsLoading(false)
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

            <HeaderWishList />

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
                    isLoading ?
                        <SkeletonCardPokemon />
                        :
                        wishList.length > 0 ?
                            wishList?.map(item => {
                                return (
                                    <CardPokemon key={item.name} data={item} />
                                )
                            })
                            :
                            <Flex
                                h="100vh"
                                w="100%"
                            >
                                <Text>You not have any pokemon in your wish list 😢</Text>
                            </Flex>

                }
            </Grid>
        </Flex>
    )
}