import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineArrowSmLeft, HiOutlineStar, HiStar } from "react-icons/hi";
import { ColorsData, PokemonResultData } from "../../../types/pokemon";

interface HeaderPokemonProps {
    colors: ColorsData;
    pokemon: PokemonResultData
    getWishList: () => [{ name: string, id: string }];
    setExistInWishList: (isActive: boolean) => void;
    existInWishList: boolean;
}

export function HeaderPokemon({ colors, pokemon, getWishList, setExistInWishList, existInWishList }: HeaderPokemonProps) {

    const router = useRouter()

    function handleGoBack() {
        router.push('/')
    }

    // Remove da wishList do localStorage
    function handleRemoveFromWishList(name: string) {
        const data = getWishList();

        const newList = data.filter(item => item.name !== name);
        if (typeof window !== undefined) {
            localStorage.setItem("@PokemonProject:PokemonWishList", JSON.stringify(newList))
            setExistInWishList(false)
        }
    }

    // Adiciona o pokemon na wishlist
    function handleAddWishListPokemons(name: string, id: string) {
        const data = {
            name,
            id
        }

        const dataList = getWishList()

        if (dataList !== null) {
            if (dataList.filter(item => item.name === name).length > 0) {
                return
            } else {
                const newListItem = [...dataList, data]
                localStorage.setItem("@PokemonProject:PokemonWishList", JSON.stringify(newListItem))
                setExistInWishList(true)

            }
        } else {
            localStorage.setItem("@PokemonProject:PokemonWishList", JSON.stringify([data]))
            setExistInWishList(true)

        }

    }


    return (
        <Flex
            w="100%"
            maxHeight="5rem"
            align="center"
            justifyContent="space-between"
            px="6"
            pt="8"

        >
            <HiOutlineArrowSmLeft
                size={28}
                color={colors.iconColor}
                onClick={handleGoBack}
                style={{ cursor: 'pointer' }}
            />
            {existInWishList ?
                <HiStar
                    size={22}
                    color={colors.iconColor}
                    onClick={() => handleRemoveFromWishList(pokemon.info.name)}
                    style={{ cursor: 'pointer' }}
                />
                :
                <HiOutlineStar
                    size={22}
                    color={colors.iconColor}
                    onClick={() => handleAddWishListPokemons(pokemon.info.name, pokemon.id)}
                    style={{ cursor: 'pointer' }}
                />
            }
        </Flex>
    )
}