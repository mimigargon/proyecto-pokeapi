
const getAllPokemons = () => {
   return fetch ('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150')
    .then ((response) => {
        return response.json();
    })
    .then ((response) => {
      return response;
    })
    .catch ((error) => {
        console.log('Ha habido un error al obtener los pokemon', error);
    });
};

const getPokemon = (url) => {
    return fetch(url)
    .then ((response) => {
        return response.json();
    })
    .then ((response) => {
        const pokemon = {
            name: response.name,
            id: response.id,
            type: response.types.map((type) => type.type.map), 
            image: response.sprites["front_default"], 
        };
        return pokemon; 
    })
    .catch((error) => console.log('Error obteniendo los pokemons', error));
};

const drawPokemons = (pokemons) => {
    pokemons.forEach((pokemon) => {
        const pokeDiv = document.createElement('div');
        pokeDiv.classList.add('poke-card');
        document.body.appendChild(pokeDiv);
        const pokeImage = document.createElement('img');
        pokeDiv.appendChild(pokeImage);
        const pokeName = document.createElement('h3');
        pokeDiv.appendChild(pokeName);
        const pokeId = document.createElement('p');
        pokeDiv.appendChild(pokeId);
        const pokeType = document.createElement('p');
        pokeDiv.appendChild(pokeType);
    })
}



const initApp = async () => {
    const data = await getAllPokemons();
    console.log(data);
}

initApp();