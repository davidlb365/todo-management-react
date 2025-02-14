import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store.ts";

export interface RegisterParameters {
  name: string,
  username: string,
  email: string,
  password: string
}

export interface RegisterResponse {
  message: string
}

export interface LoginParameters {
  usernameOrEmail: string,
  password: string
}

export interface LoginResponse {
  accessToken: string,
  tokenType: string,
  role: string
}

export interface LoginTransformResponse {
  data: LoginResponse,
  username: string
}

export interface UpdateParameters {
  id: number,
  todo: Todo
}

export interface Todo {
  title: string,
  description: string,
  completed: boolean
}

export interface TodoComplete extends Todo {
  id: number
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).todos.authToken
      if (token) {
        headers.set('authorization', token)
      }
      return headers
    },
  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    // Auth
    register: builder.mutation<RegisterResponse, RegisterParameters>({
        query: (credentials) => ({
          url: '/api/auth/register',
          method: 'POST',
          body: credentials,
          // responseHandler: (response) => response.text(),
        })
    }),
    login: builder.mutation<LoginTransformResponse, LoginParameters>({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials
      }),
      transformResponse: (response: LoginResponse, meta, arg) => {
        const data = response
        const {usernameOrEmail: username} = arg
        return {data, username}
      }
    }),

    // Todos
    getAllTodos: builder.query<TodoComplete[], void>({
      query: () => ({
        url: '/api/todos'
      }),
      providesTags: ['Todo']
    }),
    addTodo: builder.mutation<TodoComplete, Todo>({
      query: (todo) => ({
        url: '/api/todos',
        method: 'POST',
        body: todo
      }),
      invalidatesTags: ['Todo']
    }),
    updateTodo: builder.mutation<TodoComplete, UpdateParameters>({
      query: ({id, todo}) => ({
        url: `/api/todos/${id}`,
        method: 'PUT',
        body: todo
      }),
      invalidatesTags: ['Todo']
    }),
    deleteTodo: builder.mutation<string, number>({
      query: (id) => ({
        url: `/api/todos/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Todo']
    }),
    completeTodo: builder.mutation<TodoComplete, number>({
      query: (id) => ({
        url: `/api/todos/${id}/complete`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Todo']
    }),
    incompleteTodo: builder.mutation<TodoComplete, number>({
      query: (id) => ({
        url: `/api/todos/${id}/incomplete`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Todo']
    })
  })
})

export const { useRegisterMutation, useLoginMutation, useGetAllTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation, useCompleteTodoMutation, useIncompleteTodoMutation } = apiSlice