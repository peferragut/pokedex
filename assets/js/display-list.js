import { pokeAPI } from "./poke-api.js";

const MAX_RECORD = 151;

const pokemonList = document.getElementById('pokemonsOl');

function setTypeTextColor(type) {
    const brightColors = [
        'electric', 
        'grass',
        'flying',
        'bug',
        'ice',
        'rock'
    ]
    
    return brightColors.includes(type) ? '#000' : '#fff'
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.mainType}">
            <span class="number">#${pokemon.number}</span>
            <img src="${pokemon.photo}" 
                alt="${pokemon.name}">
            <div class="detail">
                <span class="name">${pokemon.name}</span>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}" style="color: ${setTypeTextColor(type)}">${type}</li>`).join('')}
                </ol>
            </div>    
        </li>
    `
}

function loadPokemons(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
    });
}

function loadMorePokemons(offset, limit) {
    offset += limit;
    const nextPokemons = offset + limit;

    if (nextPokemons >= MAX_RECORD) {
        const newLimit = MAX_RECORD - offset;
        loadPokemons(offset, newLimit);

        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = 0.3;
    } else {
        loadPokemons(offset, limit)
    }
}

export { loadPokemons, loadMorePokemons };