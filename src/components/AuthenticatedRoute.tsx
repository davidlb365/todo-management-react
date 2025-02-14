import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store.ts'

const AuthenticatedRoute = () => {
  const authenticatedUser = useSelector((state: RootState) => state.todos.authenticatedUser)
    if(authenticatedUser) {
      return <Outlet />
    }
    return <Navigate to={'/login'} />
}

export default AuthenticatedRoute