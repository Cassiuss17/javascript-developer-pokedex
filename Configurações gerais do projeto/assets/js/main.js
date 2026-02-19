/*const offset = 0
const limit = 10
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
*/

/*......   HTTP .......*/

//Fetch (Promise): processamento assicrono: não tem a resposta de imediato, em alguma momento ela responde, depende do servidor e outros fatores
//Depois do resultado de x aparece a requisição.

/*fetch(url)
    .then(function(response){
     console.log(response)

})

const x = 10 + 10
console.log(x) */
 
/*
  try{

     } catch(error){

     } finally {

     }
fetch(url)
     .then(function(response){
        return response.json()
})
     .then(function(jsonBody){
        console.log(jsonBody)
        
     })
     .catch(function(error){
        console.error(error)
     })
     .finally(function(){
        console.log('Requisição concluída!')
     })
*/
/*Simplificar o código: .then((jsonBody) => console.log(jsonBody))*/

/*......   HTTP  ......*/





/*......   HTML  ......*/
/*Busca a lista pelo  código HTML*/
/*console.log(document.getElementsByClassName('pokemons'))*/
/*console.log(document.getElementById('pokemonList'))*/

/*Pega o conteúdo da lista e adiciona mais um item no HTML */
/*const pokemonList = document.getElementById('pokemonList')
pokemonList.innerHTML += '<li>Teste</li>'*/


/* Manipula os elementos do HTML pelo Javascript / Transforma uma Lista em outra lista pelo JS */
/*function convertPokemonToLi(pokemon){
   return `
   <li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        <li class="type">grass</li>
                        <li class="type">poison</li>

                    </ol>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" 
                    alt="${pokemon.name}">

                </div>

            </li>
  `
}

const pokemonList = document.getElementById('pokemonList')


pokeApi.getPokemons().then((pokemons) => {     
   
      for (let i = 0; i < pokemons.length; i++) {
         const pokemon = pokemons[i];
         pokemonList.innerHTML += convertPokemonToLi(pokemon)

         
      }
   })





/*Conversão de uma lista de pokemon Objeto em uma lista de pokemon HTML*/
/*
function convertPokemonToLi(pokemon){
   return `
   <li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        <li class="type">grass</li>
                        <li class="type">poison</li>

                    </ol>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" 
                    alt="${pokemon.name}">

                </div>

            </li>
  `
}

const pokemonList = document.getElementById('pokemonList')


pokeApi.getPokemons().then((pokemons) => {    
      const listItens = []  
    
      for (let i = 0; i < pokemons.length; i++) {
         const pokemon = pokemons[i];
         listItens.push(convertPokemonToLi(pokemon))
         }

         console.log(listItens)
   })
*/



/*Simplificação de JS / */
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5
let offset = 0

const maxRecords = 30

// 1, 2, 3, 4, 5       0 - 5
// 6, 7, 8, 9, 10      5 - 5
// 11,                 10 - 5 (remove botão)
function convertPokemonToLi(pokemon){
   return `
   <li class="pokemon ${pokemon.type}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class = "type ${type}">${type}</li>`).join('')}

                    </ol>
                    <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">

                </div>

            </li>
  `
}


function loadPokemonItens(offset, limit){
   pokeApi.getPokemons(offset, limit).then((pokemons = []) => { 
      
   /*Map: Faz uma lista nova, volta para o html e gera um novo código de listas/ Map: converte uma lista de objetos em uma string */
   /* const newHtml = pokemons.map(convertPokemonToLi).join('')
   pokemonList.innerHTML = newHtml */ 
   pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
    
   })

}

loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', () =>{
   offset += limit

   const qtdRecordNextPage = offset + limit

   if(qtdRecordNextPage >= maxRecords){
      const newLimit = maxRecords - offset
      loadPokemonItens(offset, newLimit)

      loadMoreButton.parentElement.removeChild(loadMoreButton)
   }else{
   loadPokemonItens(offset, limit)
   }
})



