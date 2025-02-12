import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { completeTodoThunk, deleteTodoThunk, incompleteTodoThunk, loadTodosThunk } from '../redux/todosSlice.js'

const ListTodoComponent = () => {

  const todos = useSelector(state => state.todos.todos)
  const role = useSelector(state => state.todos.role)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const isUserAdmin = role && role === 'ROLE_ADMIN'

  useEffect(() => {
    if(!todos.length) dispatch(loadTodosThunk())
  }, [])
  
  const handleAddTodo = () => {
    navigate("/add-todo")
  }

  const handleUpdateTodo = id => {
    navigate(`/update-todo/${id}`)
  }

  const handleDeleteTodo = async id => {
    dispatch(deleteTodoThunk(id))
  }

  const handleCompleteTodo = id => {
    dispatch(completeTodoThunk(id))
  }

  const handleIncompleteTodo = async id => {
    dispatch(incompleteTodoThunk(id))
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