const pokemonList = document.getElementById('pokemonsOl');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const limit = 12;
let offset = 0;
const maxRecords = 151;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.mainType}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
            </div>    
        </li>
    `
}

function loadPokemons(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
    });
}

loadPokemons(offset, limit);

loadMoreBtn.addEventListener('click', () => {
    offset += limit;
    const pokemonsNextPage = offset + limit;

    if (pokemonsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemons(offset, newLimit);

        loadMoreBtn.parentElement.removeChild(loadMoreBtn)
    } else {
        loadPokemons(offset, limit);
    }
});