// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { login } from "../services/AuthService.js";
// import { addTodoAPI, completeTodoAPI, deleteTodoAPI, getAllTodosAPI, incompleteTodoAPI, updateTodoAPI } from "../services/TodoService.js";

// //Thunks
// // export const registerThunk = createAsyncThunk(
// //   'todos/fetchRegister',
// //   async (userInfo) => {
// //     const {data} = await register(userInfo)
// //     return data
// //   }
// // )

// export const loginThunk = createAsyncThunk(
//   'todos/fetchLogin',
//   async ({username, password}) => {
//     const {data} = await login({usernameOrEmail: username, password})
//     return {data, username}
//   },
// )

// export const loadTodosThunk = createAsyncThunk(
//   'todos/getAllTodos',
//   async () => {
//     const {data} = await getAllTodosAPI()
//     return data
//   },
// )

// export const addTodoThunk = createAsyncThunk(
//   'todos/addTodo',
//   async (todo) => {
//     const {data} = await addTodoAPI(todo)
//     return data
//   },
// )

// export const updateTodoThunk = createAsyncThunk(
//   'todos/updateTodo',
//   async ({id, todo}) => {
//     const {data} = await updateTodoAPI(id, todo)
//     return {id, updatedTodo: data}
//   },
// )

// export const deleteTodoThunk = createAsyncThunk(
//   'todos/deleteTodo',
//   async (id) => {
//     const {data} = await deleteTodoAPI(id)
//     return {id, data}
//   },
// )

// export const completeTodoThunk = createAsyncThunk(
//   'todos/completeTodo',
//   async (id) => {
//     const {data} = await completeTodoAPI(id)
//     return {id, data}
//   },
// )

// export const incompleteTodoThunk = createAsyncThunk(
//   'todos/incompleteTodo',
//   async (id) => {
//     const {data} = await incompleteTodoAPI(id)
//     console.log(data)
//     return {id, data}
//   },
// )


// // const handleRegisterCases = builder => {
// //   builder.addCase(registerThunk.pending, (state) => {
// //     state.loading = true
// //   })
// //   builder.addCase(registerThunk.rejected, (state, action) => {
// //     console.error(action.error.message)
// //   })
// // }

// const handleLoadTodosCases = builder => {
//   builder.addCase(loadTodosThunk.pending, (state) => {
//     state.loading = true
//   })
//   builder.addCase(loadTodosThunk.fulfilled, (state, action) => {
//     state.todos = action.payload
//   })
//   builder.addCase(loadTodosThunk.rejected, (state, action) => {
//     console.error(action.error.message)
//   })
// }

// const handleAddTodoCases = builder => {
//   builder.addCase(addTodoThunk.pending, (state) => {
//     state.loading = true
//   })
//   builder.addCase(addTodoThunk.fulfilled, (state, action) => {
//     const addedTodo = action.payload
//     state.todos = [...state.todos, addedTodo]
//   })
//   builder.addCase(addTodoThunk.rejected, (state, action) => {
//     console.error(action.error.message)
//   })
// }

// const handleUpdateTodoCases = builder => {
//   builder.addCase(updateTodoThunk.pending, (state) => {
//     state.loading = true
//   })
//   builder.addCase(updateTodoThunk.fulfilled, (state, action) => {
//     const {id, updatedTodo} = action.payload
//     state.todos = state.todos.map(todo => {
//       return todo.id === parseInt(id) ? updatedTodo : todo
//     })
//   })
//   builder.addCase(updateTodoThunk.rejected, (state, action) => {
//     console.error(action.error.message)
//   })
// }

// const handleDeleteTodoCases = builder => {
//   builder.addCase(deleteTodoThunk.pending, (state) => {
//     state.loading = true
//   })
//   builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
//     const {id} = action.payload
//     state.todos = state.todos.filter(todo => todo.id !== id)
//   })
//   builder.addCase(deleteTodoThunk.rejected, (state, action) => {
//     console.error(action.error.message)
//   })
// }

// const handleCompleteTodoCases = builder => {
//   builder.addCase(completeTodoThunk.pending, (state) => {
//     state.loading = true
//   })
//   builder.addCase(completeTodoThunk.fulfilled, (state, action) => {
//     const {id} = action.payload
//     state.todos = state.todos.map(todo => todo.id === id ? {...todo, completed: true} : todo)
//   })
//   builder.addCase(completeTodoThunk.rejected, (state, action) => {
//     console.error(action.error.message)
//   })
// }

// const handleIncompleteTodoCases = builder => {
//   builder.addCase(incompleteTodoThunk.pending, (state) => {
//     state.loading = true
//   })
//   builder.addCase(incompleteTodoThunk.fulfilled, (state, action) => {
//     const {id} = action.payload
//     state.todos = state.todos.map(todo => todo.id === id ? {...todo, completed: false} : todo)
//   })
//   builder.addCase(incompleteTodoThunk.rejected, (state, action) => {
//     console.error(action.error.message)
//   })
// }

// export const todosSlice = createSlice({
//   name: 'todos',
//   initialState: {
//     todos: [],
//     authToken: localStorage.getItem('token'),
//     authenticatedUser: localStorage.getItem('authenticatedUser'),
//     role: localStorage.getItem('role'),
//     loading: false
//   },

//   reducers: {
//     // Todos
//     removeTodos: state => {
//       state.todos = []
//     },

//     // Auth
//     storeToken: (state, action) => {
//       const {token} = action.payload
//       state.authToken = token
//       localStorage.setItem('token', token) // AuthService.js
//     },
//     storeUserInfo: (state, action) => {
//       const {username, role} = action.payload
//       state.authenticatedUser = username
//       state.role = role
//       localStorage.setItem('authenticatedUser', username)
//       localStorage.setItem('role', role)
//     },
//     removeUser: (state) => {
//       state.authToken = null
//       localStorage.removeItem('token')
//       state.authenticatedUser = null
//       localStorage.removeItem('authenticatedUser')
//       state.role = null
//       localStorage.removeItem('role')
//       state.todos = []
//     },

//     // Loading
//     startLoading: (state) => {
//       state.loading = true
//     },
//     stopLoading: (state) => {
//       state.loading = false
//     }
//   },
//   // extraReducers: (builder) => {
//   //   // Login
//   //   builder.addCase(loginThunk.pending, (state) => {
//   //     state.loading = true
//   //   })
//   //   builder.addCase(loginThunk.fulfilled, (state, action) => {
//   //     const {data, username} = action.payload
//   //     const token = data?.tokenType + ' ' + data?.accessToken
//   //     if(!token) return
//   //     state.authToken = token
//   //     localStorage.setItem('token', token)
//   //     const role = data?.role
//   //     state.authenticatedUser = username
//   //     state.role = role
//   //     localStorage.setItem('authenticatedUser', username)
//   //     localStorage.setItem('role', role)
//   //     state.loading = false
//   //   })
//   //   builder.addCase(loginThunk.rejected, (state, action) => {
//   //     console.error(action.error.message)
//   //     state.loading = false
//   //   })

//     //register
//     // handleRegisterCases(builder)

//     // //getAllTodos
//     // handleLoadTodosCases(builder)

//     // //addTodo
//     // handleAddTodoCases(builder)

//     // //updateTodo
//     // handleUpdateTodoCases(builder)

//     // //deleteTodo
//     // handleDeleteTodoCases(builder)

//     // //completeTodo
//     // handleCompleteTodoCases(builder)

//     // //incompleteTodo
//     // handleIncompleteTodoCases(builder)

//     //Matchers
//     // builder.addMatcher(loadTodosThunk.settled, (state) => {
//     //   state.loading = false
//     // })
//     // builder.addMatcher(addTodoThunk.settled, (state) => {
//     //   state.loading = false
//     // })
//     // builder.addMatcher(updateTodoThunk.settled, (state) => {
//     //   state.loading = false
//     // })
//     // builder.addMatcher(deleteTodoThunk.settled, (state) => {
//     //   state.loading = false
//     // })
//     // builder.addMatcher(completeTodoThunk.settled, (state) => {
//     //   state.loading = false
//     // })
//     // builder.addMatcher(incompleteTodoThunk.settled, (state) => {
//     //   state.loading = false
//     // })

//     // builder.addMatcher(isAnyOf(
//     //   loginThunk.settled,
//     //   registerThunk.settled,
//     //   loadTodosThunk.settled,
//     //   addTodoThunk.settled,
//     //   updateTodoThunk.settled,
//     //   deleteTodoThunk.settled,
//     //   completeTodoThunk.settled,
//     //   incompleteTodoThunk.settled), (state) => {
//     //     state.loading = false
//     //   })
//   // }
// })

// export const { removeTodos, storeToken, storeUserInfo, removeUser, startLoading, stopLoading} = todosSlice.actions

// export default todosSlice.reducer