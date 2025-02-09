import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../redux/todosSlice.js'

const Header = () => {

  const navigate = useNavigate()

  const authenticatedUser = useSelector(state => state.todos.authenticatedUser)
  const dispatch = useDispatch()

  const handleLogoutClick = () => {
    dispatch(removeUser())
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