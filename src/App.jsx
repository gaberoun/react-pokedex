import { useState, useEffect } from 'react';
import convertColor from './types';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchPokemon(data) {
    const res = await fetch(data);
    const { name, sprites, types } = await res.json();

    return { name, sprites, types };
  }

  useEffect(() => {
    const fetchedPokemons = [];
    (async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
      const data = await response.json();

      for (const obj of data.results) {
        const contents = await fetchPokemon(obj.url);
        fetchedPokemons.push(contents);
      }
      setPokemons(fetchedPokemons);
    })();
  }, [])

  const loadMore = async () => {
    setLoading(true);

    const current = pokemons.length;
    const newPokemons = [];

    for (let i = current + 1; i < current + 21; i++) {
      const pokemon = await fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      newPokemons.push(pokemon);
    }

    setTimeout(() => {
      setPokemons([...pokemons, ...newPokemons]);
      setLoading(false);
    }, 500)
  }
  
  return (
    <>
      <h1>Pokedex</h1>
      <div id='pokedex-container'>
        {pokemons.map((pokemon) => (
          <div className='card'>
            <img src={pokemon.sprites.front_default} className='sprite'/>
            <p className='name'>{ pokemon.name }</p>
            <div className='type-container'>
              {pokemon.types.map((type) => (
                <span 
                  className='type'
                  style={{backgroundColor: convertColor(type.type.name)}}
                >{ type.type.name }</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button disabled={loading} onClick={loadMore}>{ loading ? 'Loading...' : 'Load more' }</button>
    </>
  )
}

export default App;
