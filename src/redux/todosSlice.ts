import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice, LoginTransformResponse } from "../services/api.ts";

export interface TodosState {
  authToken: string | null,
  authenticatedUser: string | null,
  role: string | null
}

const initialState: TodosState = {
  authToken: localStorage.getItem('token'),
  authenticatedUser: localStorage.getItem('authenticatedUser'),
  role: localStorage.getItem('role'),
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<LoginTransformResponse>) => {
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
    },
    removeUser: (state) => {
      state.authToken = null
      localStorage.removeItem('token')
      state.authenticatedUser = null
      localStorage.removeItem('authenticatedUser')
      state.role = null
      localStorage.removeItem('role')
    },
  },
  // extraReducers: (builder) => {
  //   // Login
  //   builder.addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, action) => {
  //     const {data, username} = action.payload
  //     const token = data?.tokenType + ' ' + data?.accessToken
  //     if(!token) return
  //     setTimeout(() => {
  //       state.authToken = token
  //       localStorage.setItem('token', token)
  //       const role = data?.role
  //       state.authenticatedUser = username
  //       state.role = role
  //       localStorage.setItem('authenticatedUser', username)
  //       localStorage.setItem('role', role)
  //     }, 2000)
  //   })
  // }
})

export const { loginUser, removeUser } = todosSlice.actions

export default todosSlice.reducer