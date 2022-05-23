export type PokemonData = {
    name: string;
    order: number;
    sprites: Sprites;
    species: {
        name: string
    }
    height: number
    weight: number
    abilities: Abilities[]
    types: TypesPokemon[]
    stats: BaseStats[]
    id:number;
}


type Sprites = {
    other: {
        'official-artwork': {
            front_default: string
        }
    }
}

type Abilities = {
    ability: {
        name: string;
    }
}

type TypesPokemon = {
    type: {
        name: string;
    }
}

type Specie = {
    egg_groups: any[];
    genera: any[];
    color: {
        name: string;
    }
    flavor_text_entries: FlavorText[];
    evolution_chain: {
        url: string;
    }
}

type FlavorText = {
    flavor_text: string
}

type PokemonResultData = {
    pokemon: {
        infos: PokemonData,
        species: Specie
    }
    image: string;
}

type BaseStats = {
    base_stat: string;
    stat: {
        name: string;
    }
}