import { PokemonData, PokemonResultData, Specie } from "../types/pokemon";
import { api } from "./api";


export class PokeServices {
    private async getPokemon(pokemonIdentify: number | string) {
        const infos: PokemonData = (await api.get(`pokemon/${pokemonIdentify}`)).data
        const species: Specie = (await api.get(`pokemon-species/${pokemonIdentify}`)).data

        const pokemon ={
            infos,
            species
        }

        return pokemon;
    }

    private async getSpecies(pokemonID: number) {
        const species = (await api.get(`pokemon-species/${pokemonID}`)).data

        return species
    }

    private formattedImage(pokemon: PokemonData) {
        const image = pokemon.sprites.other["official-artwork"].front_default

        return image;
    }

    async getPokemonList() {
        const list = (await api.get('pokemon')).data;
        // let result: PokemonResultData[] = [];

        return Promise.all(list.results.map(async (pokemon) => {
            try {
                const poke = await this.getPokemon(pokemon.name)
                const image = await this.formattedImage(poke.infos)


                const data = {
                    pokemon: poke,
                    image
                }

                return data;
            } catch (err) {
                console.log(err)
            }
        }))

    }

    async getDataPokemon(pokemonID: number) {
        const pokemon = await this.getPokemon(pokemonID)
        const image = await this.formattedImage(pokemon.infos)

        const data = {
            pokemon,
            image
        }

        return data
    }

    async getNextPokemon(currentPokemon: number) {
        const data = await this.getDataPokemon(currentPokemon + 1);

        return data
    }

    async getPrevPokemon(currentPokemon: number) {

        if (currentPokemon === 1) {
            return;
        }

        const data = await this.getDataPokemon(currentPokemon + 1);
        return data
    }

}