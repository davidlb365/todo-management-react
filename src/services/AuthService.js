import axios from "axios"

const VITE_BASE_AUTH_URL = import.meta.env.VITE_BASE_AUTH_URL

export const register = user => axios.post(`${VITE_BASE_AUTH_URL}/register`, user)

export const login = user => axios.post(`${VITE_BASE_AUTH_URL}/login`, user)
