import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import convertColor from '../helper';

export default function TypePokemons({ type }) {
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

    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}?offset=${current}&limit=${current+21}`);
    const { pokemon: pokemonArray } = await response.json();

    for (let i = current + 1; i < current + 21; i++) {
      const url = pokemonArray[i].pokemon.url;
      const pokemon = await fetchPokemon(url);
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
    <section id='type-pokemons'>
      <h1>{ type } Pokemons</h1>
      <div id='pokedex-container'>
        {pokemons.map((pokemon, index) => (
          <Link to={`/pokemon/${pokemon.name}`} className='card' key={`pokemon${index}`}>
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
