import { Pokemon } from "./pokemon-model.js";

export const pokeAPI = {};

function convertApiToPokemon(pokeDetail) {
    const pokemon = new Pokemon();

    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.mainType = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeAPI.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertApiToPokemon);
};

pokeAPI.getPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((res) => res.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
};