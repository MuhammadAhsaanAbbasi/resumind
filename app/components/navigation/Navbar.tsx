import React from 'react'
import { Link } from 'react-router';

const Navbar = () => {
  
  return (
    <nav className="navbar">
        <Link to='/'>
            <h1 className='font-bold !text-5xl text-gradient'>
                Resumind
            </h1>
        </Link>
        <Link to='/upload' className='primary-button w-fit'>
            Upload Resume
        </Link>
    </nav>
  )
}

export default Navbar;