import React from 'react'
import logo from '../assets/monday.png'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()

  return (
    <nav>
        <div className='logo-container'>
            <img src={logo} alt='Monday clone' />
        </div>  
        <div className='controls-container'>
            <div className='icon' onClick={() => navigate('/ticket')}>
              <img src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/36/ffffff/external-plus-user-interface-tanah-basah-glyph-tanah-basah-2.png"/>
            </div>
            <div className='icon' onClick={() => navigate('/')}>
              <img src="https://img.icons8.com/material-outlined/36/ffffff/back--v1.png"/>
            </div>
        </div>
    </nav>
  )
}

export default NavBar