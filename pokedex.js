const EVERY_POKEMON = [];
const TYPES = ['all'];
const colors = {
    all: '#FFD700',
	grass: "#d2f2c2",
	poison: "#f7cdf7",
	fire: "#ffd1b5",
	flying: "#eae3ff",
	water: "#c2f3ff",
	bug: "#e0e8a2",
	normal: "#e6e6c3",
	electric: "#fff1ba",
	ground: "#e0ccb1",
	fighting: "#fcada9",
	psychic: "#ffc9da",
	rock: "#f0e09c",
	fairy: "#ffdee5",
	steel: "#e6eaf0",
	ice: "#e8feff",
	ghost: "#dbbaff",
	dragon: "#c4bdff",
	dark: "#a9abb0"
};

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
            type: response.types.map((type) => type.type.name),
            image: response.sprites.other['official-artwork']['front_default'],                     
        };
        
        pokemon.type.forEach((type) => {
            if (!TYPES.includes(type)) {
              TYPES.push(type);
            }
          });
    
        return pokemon; 
    })
    .catch((error) => console.log('Error obteniendo los pokemons', error));
};



const drawPokemons = (pokemon) => {
    const pokeContainer = document.querySelector('.poke-container'); 
    pokeContainer.innerText = ''; 
     pokemon.forEach((poke) => {
        const pokeContainer = document.querySelector('.poke-container');

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

        if (poke.type[1]) {
            pokeDiv.style.background =
                'linear-gradient(150deg,' + 
                colors[poke.type[0]] +
                ' 50%,' +
               colors[poke.type[1]] +
            ' 50%)';
            }else{
                pokeDiv.style.background = colors[poke.type[0]];
            }
     });

};




const pokeFilter = (event) => {
   const pokeInputValue = event.target.value.toLowerCase();
   const filteredPokemons = EVERY_POKEMON.filter((pokemon) => {
       const sameName = pokemon.name.toLowerCase().includes(pokeInputValue);
       const sameId = pokemon.id === Number(pokeInputValue);

       return sameName || sameId;
   });
   
   drawPokemons(filteredPokemons);
};

const addMyEvent = () => {
    document.getElementById('input-search').addEventListener('input', pokeFilter);
};

const pokeFilterByType = (event) => {
    const typeFilter = event.target.classList[0];
    if (typeFilter === 'all') {
        return drawPokemons(EVERY_POKEMON);
    }

    const filtered = EVERY_POKEMON.filter((pokemon) => {
        const sameType = pokemon.type.includes(typeFilter);
        return sameType;
    });

    drawPokemons(filtered);
};

const drawPokeTypeButtons = () => {
    const buttonTypeContainer = document.querySelector('.poke-buttons'); 
    
    TYPES.forEach((type) => {
        const pokeButton = document.createElement('span');
        
        pokeButton.className = type; 
                                    
        pokeButton.addEventListener('click', pokeFilterByType);
        pokeButton.innerText = type;
        pokeButton.style.background = colors[type];
        buttonTypeContainer.appendChild(pokeButton);
    });

    
};






const initApp = async () => {
    addMyEvent();
   const everyPokemon = await getAllPokemons();
   
   for(const pokemon of everyPokemon.results) {
      const pokemonInfo = await getPokemon(pokemon.url);
      EVERY_POKEMON.push(pokemonInfo);
  }
  console.log(TYPES);
  
  drawPokeTypeButtons();
  drawPokemons(EVERY_POKEMON);
};

initApp();