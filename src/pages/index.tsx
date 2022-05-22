import { Flex, Grid, Image, Text } from '@chakra-ui/react';
import type { NextPage } from 'next'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CardPokemon } from '../components/CardPokemon';
import { PokeServices } from '../service/PokeServices'
import { PokemonResultData } from '../types/pokemon';

const Home: NextPage = () => {

  const pokeServices = new PokeServices();

  const [pokemon, setPokemon] = useState({})
  const [listPokemons, setListPokemons] = useState<PokemonResultData[]>([])
  const [isLoadingPokemon, setIsLoadingPokemon] = useState(false)
  const [currentPokemonOrder, setCurrentPokemonOrder] = useState<null | number>(null)

  async function getDataPokemon() {
    setIsLoadingPokemon(true)
    const data = await pokeServices.getDataPokemon(1)
    setCurrentPokemonOrder(data.pokemon.infos.order)
    setPokemon(data)

    setIsLoadingPokemon(true)
  }

  async function handleGetNextPokemon() {
    setIsLoadingPokemon(true)
    const data = await pokeServices.getNextPokemon(currentPokemonOrder)
    setPokemon(data)

    setIsLoadingPokemon(true)
  }

  async function handleGetPrevPokemon() {
    setIsLoadingPokemon(true)
    const data = await pokeServices.getPrevPokemon(currentPokemonOrder)
    setPokemon(data)

    setIsLoadingPokemon(true)
  }

  async function getListPokemon() {
    setIsLoadingPokemon(true)

    const dataList = await pokeServices.getPokemonList();

    setListPokemons(dataList)

    setIsLoadingPokemon(false)
  }


  useEffect(() => {
    getListPokemon()
  }, [])


  return (
    <Flex
      w="100%"
      px="6"
      py="12"
      flexDir="column"
    >
      <Text
        fontSize="2xl"
        fontWeight={600}
        marginBottom="1rem"
      >
        Pokedex
      </Text>
      <Grid
        templateColumns='repeat(2,1fr)'
        gap={2}
        w="100%"
      >
        {
          listPokemons?.map(item => {
            return (
              
                <CardPokemon   key={item.pokemon.infos.order} data={item} />
              
            )
          })}
      </Grid>
    </Flex>
  )
}

export default Home
