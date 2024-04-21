import { NavLink } from 'react-router-dom'

export default function Menu() {
  return (
    <nav>
      <NavLink className='primary' to='/all'>All Pokemons</NavLink>
      <NavLink to='/types'>Types</NavLink>
      <NavLink to='/generations'>Generations</NavLink>
    </nav>
  )
}
