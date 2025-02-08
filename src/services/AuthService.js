import axios from "axios"

const VITE_BASE_AUTH_URL = import.meta.env.VITE_BASE_AUTH_URL

export const register = user => axios.post(`${VITE_BASE_AUTH_URL}/register`, user)

export const login = user => axios.post(`${VITE_BASE_AUTH_URL}/login`, user)

// export const saveToken = token => localStorage.setItem('token', token)

export const deleteToken = () => localStorage.removeItem('token')

export const getToken = () => localStorage.getItem('token')

export const saveLoggedInUser = (username, role) => {
  sessionStorage.setItem('authenticatedUser', username)
  sessionStorage.setItem('role', role)
}

// export const getLoggedInUser = () => sessionStorage.getItem('authenticatedUser')

export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem('authenticatedUser')
  if(username === null) return false
  return true
}

export const isAdmin = () => {
  let role = sessionStorage.getItem('role')
  return role && role === 'ROLE_ADMIN' ? true : false
}

export const logoutUser = () => {
  localStorage.removeItem('token')
  sessionStorage.removeItem('authenticatedUser')
  sessionStorage.removeItem('role')
}