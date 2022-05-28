const EVERY_POKEMON = [];
const TYPES = ['all'];

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
        const pokeInfoContainer = document.createElement('div');
        pokeInfoContainer.classList.add('poke-info-container');
        pokeDiv.appendChild(pokeInfoContainer);
        const pokeName = document.createElement('h3');
        pokeInfoContainer.appendChild(pokeName);
        pokeName.innerText = poke.name[0].toUpperCase() + poke.name.slice(1);
        const pokeIDContainer = document.createElement('span');
        pokeIDContainer.classList.add('poke-id-container');
        pokeInfoContainer.appendChild(pokeIDContainer);
        const pokeId = document.createElement('p');
        pokeIDContainer.appendChild(pokeId);
        pokeId.innerText = '#' + poke.id;
        const pokeTypeContainer = document.createElement('div');
        pokeTypeContainer.classList.add('poke-type-container');
        pokeInfoContainer.appendChild(pokeTypeContainer);
        const pokeType = document.createElement('p');
        pokeTypeContainer.appendChild(pokeType);
        pokeType.innerText = 'Type:' + ' ' + poke.type;
     });

};





const filterPokemon = (event) => {
    const inputPokemon = event.target.value.toLowerCase();
    const filteredPokemon = EVERY_POKEMON.filter((pokemon) => {
      const sameName = pokemon.name.toLowerCase().includes(inputPokemon);
      const sameID = pokemon.id === Number(inputPokemon);
  
      return sameName || sameID;
    });
  
    drawPokemons(filteredPokemon);
  };
  
  const addAllMyEventsListeners = () => {
    document.getElementById("input-search").addEventListener("input", filterPokemon);
  };
  
  




const initApp = async () => {

   const everyPokemon = await getAllPokemons();
   console.log(everyPokemon);
   for(const pokemon of everyPokemon.results) {
      const pokemonInfo = await getPokemon(pokemon.url);
      EVERY_POKEMON.push(pokemonInfo);
  }
  console.log(EVERY_POKEMON);
  drawPokemons(EVERY_POKEMON);
  addMyEvents();
}

initApp();