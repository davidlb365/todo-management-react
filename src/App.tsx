import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ListTodoComponent from './components/ListTodoComponent'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TodoComponent from './components/TodoComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
// import Spinner from './components/Spinner.jsx'
import AuthenticatedRoute from './components/AuthenticatedRoute.jsx'

function App() {
  console.log('App component rendered')

  return (
    <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/register' element={<RegisterComponent />} />
            <Route path='/login' element={<LoginComponent />} />
            <Route element={<AuthenticatedRoute />}>
              <Route path='/' element={<ListTodoComponent />} />
              <Route path='/todos' element={<ListTodoComponent />} />
              <Route path='/add-todo' element={<TodoComponent />} />
              <Route path='/update-todo/:id' element={<TodoComponent />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
        {/* <Spinner /> */}
    </>
  )
}

export default App
