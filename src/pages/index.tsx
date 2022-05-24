import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { Flex, Grid, Image, Spinner } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { CardPokemon } from '../components/core/CardPokemon';
import { HeaderHome } from '../components/screens/home/HeaderHome';
import { SkeletonCardPokemon } from '../components/core/SkeletonCardPokemon';

import { api } from '../service/api';
import Head from 'next/head';


const INCREMENT_NUMBER_PER_PAGE = 20;

const Home: NextPage = () => {

  const [listPokemons, setListPokemons] = useState([])
  const [isLoadingPokemon, setIsLoadingPokemon] = useState(false)
  const [hasMore, setHasMore] = useState(true);
  const [limitPage, setLimitPage] = useState(20);
  const [offsetPage, setOffsetPage] = useState(0);


  // Função para buscar a lista dos pokemons, possuindo um limitador e offset na busca
  async function getListPokemon() {
    setIsLoadingPokemon(true)

    try {
      const listPokemonsData = (await api.get(`pokemon?limit=${limitPage}&offset=${offsetPage}`)).data
      setLimitPage(limit => limit + INCREMENT_NUMBER_PER_PAGE);
      setOffsetPage(offset => offset + INCREMENT_NUMBER_PER_PAGE);
      if (limitPage > 880) {
        setHasMore(false)
      }
      setListPokemons((list) => [...list, ...listPokemonsData.results])

    } catch (err) {

    }

    setIsLoadingPokemon(false)
  }


  // Executar assim que carregar a tela
  useEffect(() => {
    getListPokemon()
  }, [])


  return (
    <>
      <Head>
        <title>Pokedex Project React - by @imatheus.max</title>
      </Head>
      <Flex
        w="100%"
        px="6"
        py="12"
        flexDir="column"
        __css={{
          'contentVisibility': 'auto'
        }}
      >

        <HeaderHome />

        <Image
          src="/pokeball.svg"
          alt="pokeball"
          position="absolute"
          right="-4rem"
          zIndex={-1}
          top="-2rem"
        />

        <InfiniteScroll
          dataLength={listPokemons.length}
          next={getListPokemon}
          hasMore={hasMore}
          loader={
            <Flex
              w="100%"
              align="center"
              justify="center"
              p='4'
            >
              <Spinner style={{ alignSelf: 'center', padding: 4 }} />
            </Flex>
          }

        >
          <Grid
            templateColumns='repeat(2,1fr)'
            gap={2}
            w="100%"
          >
            {
              listPokemons.length > 0 ?
                listPokemons?.map(item => {
                  return (
                    <CardPokemon key={item.name} data={item} />
                  )
                })
                :
                <SkeletonCardPokemon />
            }
          </Grid>
        </InfiniteScroll>
      </Flex >
    </>
  )
}

export default Home
