const pokemonList = document.getElementById('pokemonsOl');
const nextPageBtn = document.getElementById('nextPage');
const backBtn = document.getElementById('back');

let page = 1;
const limit = 12;
let offset = 0;
const MAX_RECORD = 151;

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

function gotoNextPage() {
    page++;

    if (page == 2) {
        backBtn.disabled = false;
        backBtn.style.opacity = 1
    }

    offset += limit;
    const pokemonsNextPage = offset + limit;

    if (pokemonsNextPage >= MAX_RECORD) {
        const newLimit = MAX_RECORD - offset;
        loadPokemons(offset, newLimit);

        nextPageBtn.disabled = true;
        nextPageBtn.style.opacity = 0.3;
    } else {
        loadPokemons(offset, limit);
    }
}

function gotoPrevPage() {
    page--;

    if (page == Math.ceil(MAX_RECORD / limit) - 1) {
        nextPageBtn.disabled = false;
        nextPageBtn.style.opacity = 1;
    }

    offset = offset - limit;
    
    if (page === 1) {
        backBtn.disabled = true;
        backBtn.style.opacity = 0.3;
    }

    loadPokemons(offset, limit);
}

loadPokemons(offset, limit);
backBtn.disabled = true;
backBtn.style.opacity = 0.3;

nextPageBtn.addEventListener('click', gotoNextPage);
backBtn.addEventListener('click', gotoPrevPage);

