import { Button, Flex, GridItem, Image, Text } from "@chakra-ui/react"
import Link from "next/link";
import { PokemonResultData } from "../types/pokemon";
import { ButtonType } from "./ButtonType";

interface CardPokemon {
    data: PokemonResultData
}

export function CardPokemon({ data }: CardPokemon) {
    return (
        <Link href={`/pokemon/${data.pokemon.infos.id}`} passHref>
            <Flex
                as="a"
                w="100%"
                bg={`${data.pokemon.species.color.name}.400`}
                borderRadius={12}
                flexDir="column"
                px="4"
                py="4"
                maxH="7rem"
                position="relative"
            >

                <Image
                    src="/pokeball.svg"
                    alt="pokeball"
                    position="absolute"
                    h="6rem"
                    bottom="-0.5rem"
                    right="-0.75rem"
                    opacity={0.2}
                />

                <Text
                    textTransform="capitalize"
                    color="white"
                    fontWeight={600}
                    marginBottom="0.5rem"
                >
                    {data.pokemon.infos.name}
                </Text>

                <Flex
                    flexDir="row"
                    justify="space-between"
                >
                    <Flex
                        flexDir="column"
                    >
                        {data.pokemon.infos.types.map(item => {
                            return (
                                <ButtonType
                                    key={data.image}
                                    color={data.pokemon.species.color.name}
                                    type={item.type.name}
                                />
                            )
                        })}
                    </Flex>



                    <Image
                        src={data.image}
                        height="4rem"
                        marginRight="-0.5rem"
                        alt={data.pokemon.infos.name}
                    />
                </Flex>
            </Flex>
        </Link>
    )
}