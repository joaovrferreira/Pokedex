const urlPokemon = id => `https://pokeapi.co/api/v2/pokemon/${id}` // link to the api page with informations of pokemons 

const searchPokemon = () => { 
    const pokePromises = []

    for (let i = 1; i <= 150; i++) { // loop for push pokemons from the json in the api and add informations until the last defined by function 
        pokePromises.push(fetch(urlPokemon(i)).then(response => response.json())) // html data
    }

    Promise.all(pokePromises)
        .then(pokemons => {
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                
                accumulator += `
                    <li class="card ${types[0]}">
                    <img class="card-image alt="${pokemon.name}"" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />  
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <p class="card-subtitle">${types.join(" | ")}</p>
                    </li>
                `
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]') 

          ul.innerHTML = lisPokemons  
    })
}

searchPokemon()