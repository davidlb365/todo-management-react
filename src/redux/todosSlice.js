import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../services/api.js";

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    authToken: localStorage.getItem('token'),
    authenticatedUser: localStorage.getItem('authenticatedUser'),
    role: localStorage.getItem('role'),
  },

  reducers: {
    removeUser: (state) => {
      state.authToken = null
      localStorage.removeItem('token')
      state.authenticatedUser = null
      localStorage.removeItem('authenticatedUser')
      state.role = null
      localStorage.removeItem('role')
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, action) => {
      const {data, username} = action.payload
      const token = data?.tokenType + ' ' + data?.accessToken
      if(!token) return
      state.authToken = token
      localStorage.setItem('token', token)
      const role = data?.role
      state.authenticatedUser = username
      state.role = role
      localStorage.setItem('authenticatedUser', username)
      localStorage.setItem('role', role)
    })
  }
})

export const { removeTodos, storeToken, storeUserInfo, removeUser, startLoading, stopLoading} = todosSlice.actions

export default todosSlice.reducer