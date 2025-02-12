import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthenticatedRoute = () => {
  const authenticatedUser = useSelector(state => state.todos.authenticatedUser)
    if(authenticatedUser) {
      return <Outlet />
    }
    return <Navigate to={'/login'} />
}

export default AuthenticatedRoute