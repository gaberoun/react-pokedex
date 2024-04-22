import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import AllPokemons from './components/AllPokemons';
import Layout from './components/Layout';
import Types from './components/Types';
import TypePokemons from './components/TypePokemons';
import Pokemon from './components/Pokemon';
import NotFound from './components/NotFound';

function App() {
  const [type, setType] = useState('');

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<AllPokemons />} />
          <Route path='/types' element={<Types setType={setType} />} />
          <Route path='/types/:pokemonType' element={<TypePokemons type={type} />} />
          {/* <Route path='/generations' element={<Generations />} /> */}
          <Route path='/pokemon/:name' element={<Pokemon />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;
