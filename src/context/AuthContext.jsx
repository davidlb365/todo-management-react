import { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { removeTodos } from "../redux/todosSlice.js";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'))
  const [authenticatedUser, setAuthenticatedUser] = useState(localStorage.getItem('authenticatedUser'))
  const [role, setRole] = useState(localStorage.getItem('role'))

  const dispatch = useDispatch()

  const storeToken = token => {
    setAuthToken(token)
    localStorage.setItem('token', token) // AuthService.js
  }

  const storeUserInfo = (user, role) => {
    setAuthenticatedUser(user)
    setRole(role)
    localStorage.setItem('authenticatedUser', user)
    localStorage.setItem('role', role)
  }

  const removeUser = () => {
    setAuthToken(null)
    localStorage.removeItem('token')
    setAuthenticatedUser(null)
    localStorage.removeItem('authenticatedUser')
    setRole(null)
    localStorage.removeItem('role')
    dispatch(removeTodos())
  }

  return (
    <AuthContext.Provider value={{authToken, authenticatedUser, role, storeToken, storeUserInfo, removeUser}}>
      {children}
    </AuthContext.Provider>
  )
}