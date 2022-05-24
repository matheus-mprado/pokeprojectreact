import { Flex } from '@chakra-ui/react'
import { AboutPokemon } from '../../menu/AboutPokemon'
import { BaseStatsPokemon } from '../../menu/BaseStatsPokemon'
import { EvolutionPokemon } from '../../menu/EvolutionPokemon'
import { ButtonMenu } from '../../core/ButtonMenu'
import { useState } from 'react'
import { ColorsData, PokemonResultData } from '../../../types/pokemon'


interface MenuListProps {
    pokemon: PokemonResultData;
    colors: ColorsData;
}

const MENU_LIST_ITEMS = [
    {
        id: 1,
        title: "About",
    }, {
        id: 2,
        title: "Base Stats",
    },
    {
        id: 3,
        title: "Evolution",
    }
];

export function MenuList({ pokemon, colors }: MenuListProps) {

    const [currentMenu, setCurrentMenu] = useState(1)


    return (
        <>
            <Flex
                mt="3rem"
                mb="0.5rem"
                justifyContent="space-between"
            >
                {MENU_LIST_ITEMS.map(item => {
                    return (
                        <ButtonMenu
                            key={item.id}
                            title={item.title}
                            onCurrentMenu={currentMenu}
                            menuId={item.id}
                            onClick={() => setCurrentMenu(item.id)}
                        />
                    )
                })}
            </Flex>

            {currentMenu === 1 &&
                <AboutPokemon
                    pokemon={pokemon}
                />
            }
            {currentMenu === 2 &&
                <BaseStatsPokemon
                    color={colors}
                    stats={pokemon.info?.stats}
                />
            }

            {currentMenu === 3 &&
                <EvolutionPokemon
                    pokemonName={pokemon.info?.name}
                    evolutionChain={pokemon.specie?.evolution_chain}
                />
            }

        </>
    )
}