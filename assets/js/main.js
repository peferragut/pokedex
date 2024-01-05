const pokemonList = document.getElementById('pokemonsOl');
const nextPageBtn = document.getElementById('nextPage');
const backBtn = document.getElementById('back');

let page = 1;
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
        pokemonList.innerHTML = pokemons.map(convertPokemonToLi).join('');
    });
}

loadPokemons(offset, limit);
backBtn.disabled = true;
backBtn.style.opacity = 0.3

nextPageBtn.addEventListener('click', () => {
    page++;

    if (page == 2) {
        backBtn.disabled = false;
        backBtn.style.opacity = 1
    }

    offset += limit;
    const pokemonsNextPage = offset + limit;

    if (pokemonsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemons(offset, newLimit);

        nextPageBtn.disabled = true;
        nextPageBtn.style.opacity = 0.3;
    } else {
        loadPokemons(offset, limit);
    }
});

backBtn.addEventListener('click', () => {
    page--;

    if (page == Math.ceil(maxRecords / limit) - 1) {
        nextPageBtn.disabled = false;
        nextPageBtn.style.opacity = 1;
    }

    offset = offset - limit;
    
    if (page === 1) {
        backBtn.disabled = true;
        backBtn.style.opacity = 0.3;
    }

    loadPokemons(offset, limit);
});

pokemonList.addEventListener('click', (e) => {
    if (e.target.closest("li.pokemon")) {
        console.log('This is a pokemon');
    }
});