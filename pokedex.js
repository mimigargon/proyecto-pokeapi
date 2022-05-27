const EVERY_POKEMON = [];

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
            type: response.types.map((type) => type.type.name).join(', '), 
            image: response.sprites["front_default"], 
        };
        return pokemon; 
    })
    .catch((error) => console.log('Error obteniendo los pokemons', error));
};

const drawPokemons = (pokemon) => {
     pokemon.forEach((poke) => {
        const pokeContainer = document.querySelector('.poke-container')
        const pokeDiv = document.createElement('div');
        pokeDiv.classList.add('poke-card');
        pokeContainer.appendChild(pokeDiv);
        const pokeImgContainer  = document.createElement('div');
        pokeImgContainer.classList.add('poke-img-container');
        pokeDiv.appendChild(pokeImgContainer); 
        const pokeImage = document.createElement('img');
        pokeImgContainer.appendChild(pokeImage)
        pokeImage.src = poke.image;
        const pokeName = document.createElement('h3');
        pokeDiv.appendChild(pokeName);
        pokeName.innerText = poke.name;
        const pokeId = document.createElement('p');
        pokeDiv.appendChild(pokeId);
        pokeId.innerText = poke.id;
        const pokeType = document.createElement('p');
        pokeDiv.appendChild(pokeType);
        pokeType.innerText = poke.type;
     });

};





const initApp = async () => {
    const data = await getAllPokemons();
    console.log(data);

   const everyPokemon = await getAllPokemons();
   console.log(everyPokemon);
   for(const pokemon of everyPokemon.results) {
      const pokemonInfo = await getPokemon(pokemon.url);
      EVERY_POKEMON.push(pokemonInfo);
  }
  console.log(EVERY_POKEMON);
  drawPokemons(EVERY_POKEMON);
}

initApp();