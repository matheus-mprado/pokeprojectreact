import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { Flex, Grid, Image, Skeleton, Spinner, Text } from '@chakra-ui/react';
import { CardPokemon } from '../components/CardPokemon';
import { PokeServices } from '../service/PokeServices'
import { PokemonData, PokemonResultData, Specie } from '../types/pokemon';
import { api } from '../service/api';
import { HiOutlineStar, HiStar } from 'react-icons/hi';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

const INCREMENT_NUMBER_PER_PAGE = 20;

const Home: NextPage = () => {

  const router = useRouter()

  const [listPokemons, setListPokemons] = useState([])
  const [isLoadingPokemon, setIsLoadingPokemon] = useState(false)
  const [hasMore, setHasMore] = useState(true);
  const [limitPage, setLimitPage] = useState(20);
  const [offsetPage, setOffsetPage] = useState(0);

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


  useEffect(() => {
    getListPokemon()
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
        <Text
          fontSize="2xl"
          mt="1rem"
          fontWeight={600}
          marginBottom="2rem"
        >
          Pokedex
        </Text>
        <HiStar
          size={22}
          color="#333"
          style={{ zIndex: 4 }}
          onClick={() => router.push('/WishList')}
        />
      </Flex>

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
              <>
                <Skeleton w="165px" h="115px" borderRadius={8} />
                <Skeleton w="165px" h="115px" borderRadius={8} />
                <Skeleton w="165px" h="115px" borderRadius={8} />
                <Skeleton w="165px" h="115px" borderRadius={8} />
                <Skeleton w="165px" h="115px" borderRadius={8} />
              </>
          }
        </Grid>
      </InfiniteScroll>
    </Flex >
  )
}

export default Home
