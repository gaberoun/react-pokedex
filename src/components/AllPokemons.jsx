import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import convertColor from '../helper';

export default function AllPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchPokemon(data) {
    const res = await fetch(data);
    const { name, sprites, types } = await res.json();

    return { name, sprites, types };
  }

  const load = async () => {
    setLoading(true);

    const current = pokemons.length;
    const newPokemons = [];

    for (let i = current + 1; i < current + 21; i++) {
      const pokemon = await fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      newPokemons.push(pokemon);
    }

    setPokemons([...pokemons, ...newPokemons]);
    setLoading(false);
  }

  useEffect(() => {
    load();
    
    return () => {
      setPokemons([]);
    }
  }, [])
  
  return (
    <section id='all-pokemons'>
      <Link className='menu' to='/'>Back to Menu</Link>
      <h1>Pokedex</h1>
      <div id='pokedex-container'>
        {pokemons.map((pokemon, index) => (
          <Link to={`/${pokemon.name}`} className='card' key={`pokemon${index}`}>
            <img src={pokemon.sprites.front_default} className='sprite'/>
            <p className='name'>{ pokemon.name }</p>
            <div className='type-container'>
              {pokemon.types.map((type, index) => (
                <span 
                  className='type'
                  style={{backgroundColor: convertColor(type.type.name)}}
                  key={`type${index}`}
                >{ type.type.name }</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      <button disabled={loading} onClick={load}>{ loading ? 'Loading...' : 'Load more' }</button>
    </section>
  )
}
