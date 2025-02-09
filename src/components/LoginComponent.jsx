import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/AuthService'
import { useDispatch } from 'react-redux'
import { startLoading, stopLoading, storeToken, storeUserInfo } from '../redux/todosSlice.js'

const LoginComponent = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      dispatch(startLoading())
      const {data} = await login({usernameOrEmail: username, password})
      const token = data?.tokenType + ' ' + data?.accessToken
      if(!token) return
      dispatch(storeToken({token}))
      const role = data?.role
      dispatch(storeUserInfo({username, role}))
      navigate('/todos')
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(stopLoading())
    }
  }

  return (
    <div className='container'>
      <div className="row">
        <div className='col-md-8 col-lg-6 offset-md-2 offset-lg-3'>
          <div className="card">
            <div className='card-header'>
              <h2 className='text-center'>Login Form</h2>
            </div>
            <div className='card-body'>
              <form>
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
                  <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                  <p className='mb-0'>Not registered? <Link to='/register'>register here</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent