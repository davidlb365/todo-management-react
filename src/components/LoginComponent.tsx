import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../services/api.ts'
import Spinner from './Spinner'
import { ErrorData } from '../types/error.ts'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store.ts'
import { loginUser } from '../redux/todosSlice.ts'

const LoginComponent = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const dispatch: AppDispatch = useDispatch()

  const [login, {isLoading, isSuccess, isError, error}] = useLoginMutation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login({usernameOrEmail: username, password}).unwrap()
      .then(res => {
        setTimeout(() => {
          dispatch(loginUser(res))
          navigate('/todos')
        }, 2000)
        })
      .catch(error => console.error(error))
  }

  if(isLoading) return <Spinner />

  return (
    <div className='container'>
      <div className="row">
        <div className='col-md-8 col-lg-6 offset-md-2 offset-lg-3'>
          <div className="card">
            <div className='card-header'>
              <h2 className='text-center'>Login Form</h2>
            </div>
            <div className='card-body'>
              <form onSubmit={e => handleSubmit(e)}>
                <div className='row align-items-center mb-3'>
                  <label className='form-label col-md-3 mb-0'>Username</label>
                  <div className="col-md-9">
                    <input type="text" name='username' placeholder='Enter username' className='form-control' value={username} onChange={e => setUsername(e.target.value)}/>
                  </div>
                </div>
                <div className='row align-items-center mb-3'>
                  <label className='form-label col-md-3 mb-0'>Password</label>
                  <div className="col-md-9">
                    <input type="password" name='password' placeholder='Enter password' className='form-control' value={password} onChange={e => setPassword(e.target.value)}/>
                  </div>
                </div>
                <div className='form-group mb-3 d-flex align-items-center gap-2'>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                  <p className='mb-0'>Not registered? <Link to='/register'>register here</Link></p>
                </div>
              </form>
              {isSuccess && <p className='alert alert-success'>You have logged in successfully</p> }
              {isError && ('data' in error) && <p className='alert alert-danger'>{(error.data as ErrorData).message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent