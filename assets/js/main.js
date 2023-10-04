
// Buscam pelo id Lista de Pokemons e Button de 'ver mais' 
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;


// função para converter o HTML do pokemon em Lista e uso da Class criada
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
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


//Mapeamento da lista de pokemons para junção em uma nova HTML
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

// Função para uso Button e carregamento da página com mais pokemons
loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qntRecordNextPage = offset + limit

    if (qntRecordNextPage >= maxRecords) {
        const newLimit = qntRecordNextPage - offset
        loadPokemonItens (offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else{
        loadPokemonItens (offset, limit)
    }

    
})



