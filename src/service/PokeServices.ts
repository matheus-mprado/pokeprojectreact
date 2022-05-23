import { PokemonData, PokemonResultData, Specie } from "../types/pokemon";
import { api } from "./api";


export class PokeServices {
    private async getPokemon(pokemonIdentify: number | string) {
        const infos: PokemonData = (await api.get(`pokemon/${pokemonIdentify}`)).data
        const species: Specie = (await api.get(`pokemon-species/${pokemonIdentify}`)).data

        const pokemon = {
            infos,
            species,
        }

        return pokemon;
    }

    async getImageFromSpecies(pokemonName: string) {
        const pokemon: PokemonData = (await api.get(`pokemon/${pokemonName}`)).data
        const image = this.formattedImage(pokemon)

        return image
    }

    private formattedImage(pokemon: PokemonData) {
        const image = pokemon.sprites.other["official-artwork"].front_default
        return image;
    }

    async teste(pokemon) {
        const poke = await this.getPokemon(pokemon.name)
        const image = await this.formattedImage(poke.infos)

        const data = {
            pokemon: poke,
            image
        }

        return data;
    }

    
    async getPokemonList() {
        const list = (await api.get('pokemon')).data;

        const allpromise = Promise.all(list.results.map(item => this.teste(item)))

        const values = await allpromise;

        return values
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

        const data = await this.getDataPokemon(currentPokemon - 1);
        return data
    }

}