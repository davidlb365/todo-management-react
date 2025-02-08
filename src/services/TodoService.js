import axios from "axios"
import { getToken } from "./AuthService";

const VITE_BASE_TODOS_URL = import.meta.env.VITE_BASE_TODOS_URL

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = getToken()
  if(token) {
    config.headers['Authorization'] = token
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export const getAllTodosAPI = () => {
  return axios(VITE_BASE_TODOS_URL)
}

export const addTodoAPI = todo => {
  return axios.post(VITE_BASE_TODOS_URL, todo)
}

export const getTodo = id => {
  return axios(`${VITE_BASE_TODOS_URL}/${id}`)
}

export const updateTodoAPI = (id, todo) => {
  return axios.put(`${VITE_BASE_TODOS_URL}/${id}`, todo)
}

export const deleteTodoAPI = id => {
  return axios.delete(`${VITE_BASE_TODOS_URL}/${id}`)
}

export const completeTodoAPI = id => {
  return axios.patch(`${VITE_BASE_TODOS_URL}/${id}/complete`)
}
export const incompleteTodoAPI = id => {
  return axios.patch(`${VITE_BASE_TODOS_URL}/${id}/incomplete`)
}