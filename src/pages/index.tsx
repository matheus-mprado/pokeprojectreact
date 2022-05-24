import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { Flex, Grid, Skeleton, Text } from '@chakra-ui/react';
import { CardPokemon } from '../components/CardPokemon';
import { PokeServices } from '../service/PokeServices'
import { PokemonData, PokemonResultData, Specie } from '../types/pokemon';
import { api } from '../service/api';

const Home: NextPage = () => {


  const [listPokemons, setListPokemons] = useState([])
  const [isLoadingPokemon, setIsLoadingPokemon] = useState(false)


  async function getListPokemon() {
    setIsLoadingPokemon(true)

    try {
      const listPokemonsData = (await api.get(`pokemon`)).data
      console.log(listPokemonsData)
      setListPokemons(listPokemonsData.results)

    } catch (err) {

    }

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
          listPokemons ?
            listPokemons?.map(item => {
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

export default Home
