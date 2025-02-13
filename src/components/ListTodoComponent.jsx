import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetAllTodosQuery, useDeleteTodoMutation, useCompleteTodoMutation, useIncompleteTodoMutation } from '../services/api.js'
import Spinner from './Spinner.jsx'

const ListTodoComponent = () => {

  const role = useSelector(state => state.todos.role)

  const {data: todos = [], isFetching,} = useGetAllTodosQuery()

  const [deleteTodo, {isLoading: isDeleting}] = useDeleteTodoMutation()
  const [completeTodo, {isLoading: isCompleting}] = useCompleteTodoMutation()
  const [incompleteTodo, {isLoading: isIncompleting}] = useIncompleteTodoMutation()
  

  const navigate = useNavigate()

  const isUserAdmin = role && role === 'ROLE_ADMIN'
  
  const handleAddTodo = () => {
    navigate("/add-todo")
  }

  const handleUpdateTodo = id => {
    navigate(`/update-todo/${id}`)
  }

  const handleDeleteTodo = id => {
    deleteTodo(id)
  }

  const handleCompleteTodo = id => {
    completeTodo(id)
  }

  const handleIncompleteTodo = id => {
    incompleteTodo(id)
  }

  return (
    <>
      <div className={`container ${(isFetching || isDeleting || isCompleting || isIncompleting) && 'pe-none'}`}>
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
      {(isFetching || isDeleting || isCompleting || isIncompleting) && <Spinner />}
    </>
  )
}

export default ListTodoComponent