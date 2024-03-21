import { loadPokemons, loadMorePokemons } from "./display-list.js";

const loadMoreBtn = document.getElementById('loadMoreBtn');

const limit = 12;
let offset = 0;

loadPokemons(offset, limit);
loadMoreBtn.addEventListener('click', (offset, limit) => {
    loadMorePokemons(offset, limit);
});


