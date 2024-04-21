import { Link } from 'react-router-dom'

export default function Types({ setType }) {

  return (
    <nav id='type-menu'>
      <Link onClick={() => setType('normal')} to='/types/normal'>Normal</Link>
      <Link onClick={() => setType('fire')} to='/types/fire'>Fire</Link>
      <Link onClick={() => setType('water')} to='/types/water'>Water</Link>
      <Link onClick={() => setType('electric')} to='/types/electric'>Electric</Link>
      <Link onClick={() => setType('grass')} to='/types/grass'>Grass</Link>
      <Link onClick={() => setType('ice')} to='/types/ice'>Ice</Link>
      <Link onClick={() => setType('fighting')} to='/types/fighting'>Fighting</Link>
      <Link onClick={() => setType('poison')} to='/types/poison'>Poison</Link>
      <Link onClick={() => setType('ground')} to='/types/ground'>Ground</Link>
      <Link onClick={() => setType('flying')} to='/types/flying'>Flying</Link>
      <Link onClick={() => setType('psychic')} to='/types/psychic'>Psychic</Link>
      <Link onClick={() => setType('bug')} to='/types/bug'>Bug</Link>
      <Link onClick={() => setType('rock')} to='/types/rock'>Rock</Link>
      <Link onClick={() => setType('ghost')} to='/types/ghost'>Ghost</Link>
      <Link onClick={() => setType('dragon')} to='/types/dragon'>Dragon</Link>
      <Link onClick={() => setType('dark')} to='/types/dark'>Dark</Link>
      <Link onClick={() => setType('steel')} to='/types/steel'>Steel</Link>
      <Link onClick={() => setType('fairy')} to='/types/fairy'>Fairy</Link>
      <Link className='primary' to='/'>Back to Menu</Link>
    </nav>
  )
}
