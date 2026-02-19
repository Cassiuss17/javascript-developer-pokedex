
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){ /*Conversão do Modelo do pokiApi para o novo pokemon-model */
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types /*const [type1, type2, type3] = types */
    
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => { /*Converção de HTML pra json */
    return fetch(pokemon.url)
           .then((response) => response.json())
           .then(convertPokeApiDetailToPokemon)

           
}
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        
    return fetch(url) /*Foi no servidor e buscou a lista de pokemons */
         .then((response) => response.json())  /* Converteu a lista pra json */
         .then((jsonBody) => jsonBody.results) /* Converteu a lista pra json */
         .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) /* Peguei a lista que estava dentro do json(os pokemons), depois transforma essa lista em uma nova lista(lista de promessas dos detalhes do pokemon), converte pra json */
         .then((detailRequests) => Promise.all(detailRequests)) /*Requisições de detalhes, esperando todas elas terminarem*/
         .then((pokemonsDetails) => pokemonsDetails) /*resultado*/

}


/*Requisições e Promessas

Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4')
]).then((results) => {
    console.log(results)
}) 
*/

