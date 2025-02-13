import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../services/api.js'
import Spinner from './Spinner.jsx'

const RegisterComponent = () => {

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [register, {data, isLoading, isSuccess, isError, error}] = useRegisterMutation()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    register({name, username, email, password}).unwrap()
      .then(() => {
        setTimeout(() => {
          navigate('/login')
        }, 3000);
      })
      .catch(error => console.log(error))
    // dispatch(registerThunk({name, username, email, password}))
    //   .then(() => navigate('/login'))
  }

  if(isLoading) return (
    <Spinner />
  )

  return (
    <div className='container'>
      <div className="row">
        <div className='col-md-8 col-lg-6 offset-md-2 offset-lg-3'>
          <div className="card">
            <div className='card-header'>
              <h2 className='text-center'>Registration Form</h2>
            </div>
            <div className='card-body'>
              <form>
                <div className='row align-items-center mb-3'>
                  <label className='form-label col-md-3 mb-0'>Name</label>
                  <div className="col-md-9">
                    <input type="text" name='name' placeholder='Enter name' className='form-control' value={name} onChange={e => setName(e.target.value)}/>
                  </div>
                </div>
                <div className='row align-items-center mb-3'>
                  <label className='form-label col-md-3 mb-0'>Username</label>
                  <div className="col-md-9">
                    <input type="text" name='username' placeholder='Enter username' className='form-control' value={username} onChange={e => setUsername(e.target.value)}/>
                  </div>
                </div>
                <div className='row align-items-center mb-3'>
                  <label className='form-label col-md-3 mb-0'>Email</label>
                  <div className="col-md-9">
                    <input type="email" name='email' placeholder='Enter email' className='form-control' value={email} onChange={e => setEmail(e.target.value)}/>
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
                  <p className='mb-0'>Already registered? <Link to='/login'>login here</Link></p>
                </div>
              </form>
              {isSuccess && <p className='alert alert-success'>{data?.message}</p>}
              {isError && <p className='alert alert-danger'>{error.data.message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterComponent