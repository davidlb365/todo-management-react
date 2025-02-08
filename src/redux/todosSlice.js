import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: []
  },

  reducers: {
    loadTodos: (state, action) => {
      state.todos = action.payload
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
    }
    
  }
})

export const {loadTodos, incompleteTodo, completeTodo, deleteTodo, removeTodos} = todosSlice.actions

export default todosSlice.reducer