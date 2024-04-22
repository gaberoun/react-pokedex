import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'

export default function Layout() {
  const [menu, setMenu] = useState('hide');

  const toggleMenu = () => {
    menu === 'hide' ? setMenu('show') : setMenu('hide');
  }

  return (
    <>
      <img 
        src='https://cdn-icons-png.flaticon.com/512/660/660376.png' 
        id='menu-button' 
        onClick={toggleMenu}  
      />
      <nav className={menu}>
        <NavLink className='primary' to='/'>All Pokemons</NavLink>
        <NavLink to='/types'>Types</NavLink>
        <NavLink to='/generations'>Generations</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}
