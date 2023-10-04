
// Api
const pokeApi = {}

//Constructor para converter Api em Class
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type 
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
   

    return pokemon 
}

// Get para retornar o detalhe do pokemon que será convertido juntamente com a Class
pokeApi.getPokeDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((convertPokeApiDetailToPokemon))
}



// Requisição para converter o pokemon para Json + Promisse de retorno quando todas as requisições forem atendidas
pokeApi.getPokemons = (offset = 0, limit =5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
      
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results) 
        .then((pokemons) => pokemons.map(pokeApi.getPokeDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => (pokemonDetails)
        )
}
