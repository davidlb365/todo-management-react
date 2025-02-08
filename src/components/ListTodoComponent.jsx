import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { completeTodoAPI, deleteTodoAPI, getAllTodosAPI, incompleteTodoAPI } from '../services/TodoService'
import { useNavigate } from 'react-router-dom'
import { isAdmin } from '../services/AuthService'
import { AuthContext } from '../context/AuthContext.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { completeTodo, deleteTodo, incompleteTodo, loadTodos } from '../redux/todosSlice.js'
// import { SpinContext } from '../context/SpinProvider.jsx'
import { SpinContext } from '../context/SpinContext.js'

const ListTodoComponent = () => {

  console.log('ListTodoComponent rendered')

  // const dummyData = [
  //   {
  //     id: 1,
  //     title: 'Todo 1',
  //     description: 'Description 1',
  //     completed: false
  //   },
  //   {
  //     id: 2,
  //     title: 'Todo 2',
  //     description: 'Description 2',
  //     completed: false
  //   },
  //   {
  //     id: 3,
  //     title: 'Todo 3',
  //     description: 'Description 3',
  //     completed: false
  //   }
  // ]

  const todos = useSelector(state => state.todos.todos)
  const dispatch = useDispatch()

  const {role} = useContext(AuthContext)
  const {startLoading, stopLoading} = useContext(SpinContext)

  const navigate = useNavigate()

  const isUserAdmin = role && role === 'ROLE_ADMIN'

  useEffect(() => {
    console.log('ListTodoComponent mounted')
    // const getTodos = async () => {
    //   try {
    //     startLoading()
    //     const {data} = await getAllTodosAPI()
    //     dispatch(loadTodos(data))
    //   } catch (error) {
    //     console.error(error)
    //   } finally {
    //     stopLoading()
    //   }
    // }

    // getTodos()

    startLoading()
    getAllTodosAPI()
      .then(({data}) => {
        dispatch(loadTodos(data))
      })
      .catch(error => console.error(error))
      .finally(() => stopLoading())

    return () => {
      console.log('ListTodoComponent unmounted')
    }
  }, [])
  
  const handleAddTodo = () => {
    navigate("/add-todo")
  }

  const handleUpdateTodo = id => {
    navigate(`/update-todo/${id}`)
  }

  const handleDeleteTodo = async id => {
    try {
      startLoading()
      const {data} = await deleteTodoAPI(id)
      dispatch(deleteTodo({id}))
    } catch (error) {
      console.error(error)
    }
    finally {
      stopLoading()
    }
  }

  const handleCompleteTodo = async id => {
    try {
      startLoading()
      const {data} = await completeTodoAPI(id)
      dispatch(completeTodo({id}))
    } catch (error) {
      console.error(error)
    } finally {
      stopLoading()
    }
  }

  const handleIncompleteTodo = async id => {
    try {
      startLoading()
      const {data} = await incompleteTodoAPI(id)
      dispatch(incompleteTodo({id}))
    } catch (error) {
      console.error(error)
    } finally {
      stopLoading()
    }
  }

  return (
    <div className='container'>
      <h2 className='text-center mb-3'>List of Todos</h2>
      { isUserAdmin && <button className='btn btn-primary mb-2' onClick={handleAddTodo}>Add Todo</button> }
      <div>
        <table className='table table-bordered table-striped'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos?.map(todo => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? 'Yes' : 'No'}</td>
                <td className='row flex-column align-items-center flex-md-row align-items-md-stretch gap-1 m-0 w-100 h-100'>
                  {isUserAdmin &&
                  <>
                    <button className="btn btn-info col-lg" onClick={() => handleUpdateTodo(todo.id)}>Update</button>
                    <button className="btn btn-danger col-lg" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                  </>
                  }
                  <button className="btn btn-success col-lg" onClick={() => handleCompleteTodo(todo.id)}>Complete</button>
                  <button className="btn btn-secondary col-lg" onClick={() => handleIncompleteTodo(todo.id)}>Incomplete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListTodoComponent