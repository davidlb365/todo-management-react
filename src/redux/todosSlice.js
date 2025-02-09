import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    authToken: localStorage.getItem('token'),
    authenticatedUser: localStorage.getItem('authenticatedUser'),
    role: localStorage.getItem('role'),
    loading: false
  },

  reducers: {
    // Todos
    loadTodos: (state, action) => {
      state.todos = action.payload
    },
    addTodo: (state, action) => {
      const {addedTodo} = action.payload
      state.todos = [...state.todos, addedTodo]
    },
    updateTodo: (state, action) => {
      const {id, updatedTodo} = action.payload
      state.todos = state.todos.map(todo => todo.id === id ? updatedTodo : todo)
    },
    incompleteTodo: (state, action) => {
      const {id} = action.payload
      state.todos = state.todos.map(todo => todo.id === id ? {...todo, completed: false} : todo)
    },
    completeTodo: (state, action) => {
      const {id} = action.payload
      state.todos = state.todos.map(todo => todo.id === id ? {...todo, completed: true} : todo)
    },
    deleteTodo: (state, action) => {
      const {id} = action.payload
      state.todos = state.todos.filter(todo => todo.id !== id)
    },
    removeTodos: state => {
      state.todos = []
    },

    // Auth
    storeToken: (state, action) => {
      const {token} = action.payload
      state.authToken = token
      localStorage.setItem('token', token) // AuthService.js
    },
    storeUserInfo: (state, action) => {
      const {username, role} = action.payload
      state.authenticatedUser = username
      state.role = role
      localStorage.setItem('authenticatedUser', username)
      localStorage.setItem('role', role)
    },
    removeUser: (state) => {
      state.authToken = null
      localStorage.removeItem('token')
      state.authenticatedUser = null
      localStorage.removeItem('authenticatedUser')
      state.role = null
      localStorage.removeItem('role')
      state.todos = []
    },

    // Loading
    startLoading: (state) => {
      state.loading = true
    },
    stopLoading: (state) => {
      state.loading = false
    }
  }
})

export const {loadTodos, addTodo, updateTodo, incompleteTodo, completeTodo, deleteTodo, removeTodos, storeToken, storeUserInfo, removeUser, startLoading, stopLoading} = todosSlice.actions

export default todosSlice.reducer