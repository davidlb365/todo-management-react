import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../redux/todosSlice.ts'
import { RootState } from '../redux/store.ts'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const Header = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  const authenticatedUser = useSelector((state: RootState) => state.todos.authenticatedUser)
  const dispatch = useDispatch()

  const handleLogoutClick = () => {
    dispatch(removeUser())
    setShow(false)
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
              <button className='nav-link' onClick={handleShow}>Logout</button>
            </li>
          }
          </ul>
        </nav>
      </header>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Header