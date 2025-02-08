import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { Navigate, Outlet } from 'react-router-dom'

const AuthenticatedRoute = () => {
  const {authenticatedUser} = useContext(AuthContext)
    if(authenticatedUser) {
      return <Outlet />
    }
    return <Navigate to={'/login'} />
}

export default AuthenticatedRoute