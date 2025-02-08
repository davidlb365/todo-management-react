import React, { useContext, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, logoutUser } from '../services/AuthService'
import { AuthContext } from '../context/AuthContext.jsx'

const Header = () => {

  const navigate = useNavigate()

  const {authenticatedUser, removeUser} = useContext(AuthContext)

  const handleLogoutClick = () => {
    removeUser()
    navigate('/login')
  }

  return (
    <div className='mb-3'>
      <header>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark px-3'>
          <div>
            <Link to={'/'} className='navbar-brand'>
              Todo App
            </Link>
          </div>
          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav'>
              { authenticatedUser && <li className='nav-item'>
                <NavLink to={'/todos'} className='nav-link'>Todos</NavLink>
              </li>}
            </ul>
          </div>
          <ul className='navbar-nav'>
          {!authenticatedUser && 
            <li className='nav-item'>
              <NavLink to={'/register'} className='nav-link'>Register</NavLink>
            </li>
          }
          {!authenticatedUser && 
            <li className='nav-item'>
              <NavLink to={'/login'} className='nav-link'>Login</NavLink>
            </li>
          }
          {authenticatedUser && 
            <li className='nav-item'>
              <NavLink to={'/login'} className='nav-link' onClick={handleLogoutClick}>Logout</NavLink>
            </li>
          }
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header