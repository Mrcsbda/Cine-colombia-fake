import React from 'react'
import Navbar from '../nav/Navbar'
import Genres from '../genres/Genres'
import "./header.scss"
import NavbarChoice from '../nav-choice/NavbarChoice'

const Header = ({isCheckout}) => {
  const genres = ["Acción", "Terror", "Ciencia Ficción", "Comedia"]
  return (
    <header>
      <Navbar isCheckout={isCheckout}/>
      <section>
        <div className='header--choice-container'>
          <NavbarChoice/>
        </div>
        <div className={isCheckout ? 'hidden' : 'header--genre-container' }>
          <Genres genres={genres}/>
        </div>
      </section>


    </header>
  )
}

export default Header