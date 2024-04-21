import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import convertColor from '../helper';

export default function Pokemon() {
  const { name: pokemon } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('loading', loading);
  }, [loading])

  const load = async () => {
    try {   
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
      const {
        height, 
        //cries, 
        weight, 
        id, 
        types,
        location_area_encounters
      } = await response.json();

      const locationResponse = await fetch(location_area_encounters); 
      const result = await locationResponse.json();

      let locations = [];
      result.forEach((area) => {
        let location = area.location_area.name;
        location = location.split('-').join(' ');
        locations.push(location);
      })

      return({
        height, 
        //cries, 
        weight, 
        id, 
        types,
        locations
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      const fetchedPokemon = await load();
      setData(fetchedPokemon);
      setLoading(false);

      console.log(fetchedPokemon);
    })();

    return () => {
      setData({});
      setLoading(true);
    }
  }, []);

  return (
    <>
      <section id='pokemon'>
      <Link className='menu' to='/'>Back to Menu</Link>
        <div className='left'>
          <h1>{ pokemon }</h1>
          <h3>{ loading ? 'Loading...' : `ID: ${data.id}` }</h3>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`} id='image' />
          <p>Height: {data.height} decimeters</p>
          <p>Weight: {data.weight} hectograms</p>
          <h3>Types: </h3>
          <div className='type-container'>
            {loading ? 'Loading...' : data.types.map((type) => (
              <span 
                className='type'
                style={{backgroundColor: convertColor(type.type.name)}}
              >{ type.type.name }</span>
            ))}
          </div>
        </div>
        <div id='location-container'>
          <h3>Locations</h3>
          <div id='locations'>
            {loading ? 'Loading...' 
            : data.locations.length === 0 ? (<p>Cannot be found</p>)
            : data.locations.map((area, index) => (
              <p key={`area${index}`}>{ area }</p>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
