import React from 'react'
import "./CSS/home.css"
import Gallery from './Gallery'

function Home() {
  return (
    <div className='wrapper '>
      <div className='hero' >
        <img src={`http://localhost:9000/user/products/hero.jpg`} />
      </div>
      <Gallery></Gallery>
    </div>
  )
}

export default Home
