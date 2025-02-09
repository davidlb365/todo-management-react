import { useState } from 'react'
import { addTodoAPI, updateTodoAPI } from '../services/TodoService'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, startLoading, stopLoading, updateTodo } from '../redux/todosSlice.js'

const TodoComponent = () => {

  const {id} = useParams()

  const todo = useSelector(state => state.todos.todos)?.find(todo => todo.id === parseInt(id))
  const dispatch = useDispatch()

  const [title, setTitle] = useState(() => todo ? todo.title : '')
  const [description, setDescription] = useState(() => todo ? todo.description : '')
  const [completed, setCompleted] = useState(() => todo ? todo.completed : false)
  const [errors, setErrors] = useState({
    titleError: '',
    descriptionError: ''
  })

  const navigate = useNavigate()

  const validateForm = () => {
    if(![title, description].includes('')) {
      return true;
    }
    let errorsCopy = {...errors}
    if(title.trim() === '') {
      errorsCopy = {...errorsCopy, titleError: 'Title is required'}
    }
    if(description.trim() === '') {
      errorsCopy = {...errorsCopy, descriptionError: 'Description is required'}
    }
    setErrors(errorsCopy)
    return false
  }

  const handleSubmit = async e => {
    dispatch(startLoading())
    e.preventDefault()
    if(validateForm()) {
      try {
        dispatch(startLoading())
        if(id) {
          const {data} = await updateTodoAPI(id, {title, description, completed})
          dispatch(updateTodo({id, updatedTodo: data}))
        }
        else {
          const {data} = await addTodoAPI({title, description, completed})
          dispatch(addTodo({addedTodo: data}))
        }
        navigate("/todos")
      } catch (error) {
        console.error(error)
      }
      finally {
        dispatch(stopLoading())
      }
    }
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='card col-md-6'>
          <h2 className='text-center'>{id ? 'Update' : 'Add'} Todo</h2>
          <div className='card-body'>
            <form>
              <div className="form-group mb-2">
                <label htmlFor="title" className="form-label">Todo Title</label>
                <input type="text" className='form-control' name='title' placeholder='Enter Todo Title' value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              { errors.titleError && <p className='text-danger'>{errors.titleError}</p> }
              <div className="form-group mb-2">
                <label htmlFor="description" className="form-label">Todo Description</label>
                <input type="text" className='form-control' name='description' placeholder='Enter Todo Description' value={description} onChange={e => setDescription(e.target.value)} />
              </div>
              { errors.descriptionError && <p className='text-danger'>{errors.descriptionError}</p> }
              <div className="form-group mb-2">
                <label htmlFor="completed" className="form-label">Todo Completed</label>
                <select className='form-control' name="completed" id="completed" value={completed} onChange={e => setCompleted(e.target.value)}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <button type="submit" className='btn btn-success' onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default TodoComponent