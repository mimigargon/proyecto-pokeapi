let arrayDePokemon = []; 

const getAllPokemon = () => {
   fetch ('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150')
    .then (res => res.json())
    .then (res => {
       getAllPokemon.forEach(pokemon => {
            fetch('https://pokeapi.co/api/v2/pokemon/')
            .then (res => res.json())
            .then (res => {
                return res.result
            })

            .catch(error => console.log('error ->', error));
        }); 
           
            
        
        console.log(res)
        return res
    })
}


getAllPokemon();


const pokemon = results.map((result) => ({
    name: result.name,
    image: result.sprites['front_default'], 
    type: result.types.map((type) => type.type.name).join(', '),
    id: result.id
}));

const drawPokemon = (pokemons) => {
    let gallery = document.querySelector('.container');
    for(const pokemon of pokemons) {
        let pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon-card');
    }
}
