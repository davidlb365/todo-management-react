import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().todos.authToken
      if (token) {
        headers.set('authorization', token)
      }
      return headers
    },
  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    // Auth
    register: builder.mutation({
        query: (credentials) => ({
          url: '/api/auth/register',
          method: 'POST',
          body: credentials,
          // responseHandler: (response) => response.text(),
        })
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials
      }),
      transformResponse: (response, meta, arg) => {
        const data = response
        const {usernameOrEmail: username} = arg
        return {data, username}
      }
    }),

    // Todos
    getAllTodos: builder.query({
      query: () => ({
        url: '/api/todos'
      }),
      providesTags: ['Todo']
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/api/todos',
        method: 'POST',
        body: todo
      }),
      invalidatesTags: ['Todo']
    }),
    updateTodo: builder.mutation({
      query: ({id, todo}) => ({
        url: `/api/todos/${id}`,
        method: 'PUT',
        body: todo
      }),
      invalidatesTags: ['Todo']
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/api/todos/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Todo']
    }),
    completeTodo: builder.mutation({
      query: (id) => ({
        url: `/api/todos/${id}/complete`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Todo']
    }),
    incompleteTodo: builder.mutation({
      query: (id) => ({
        url: `/api/todos/${id}/incomplete`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Todo']
    })
  })
})

export const { useRegisterMutation, useLoginMutation, useGetAllTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation, useCompleteTodoMutation, useIncompleteTodoMutation } = apiSlice