import { useSelector } from 'react-redux'
import '../Spinner.css'

const Spinner = () => {
  const loading = useSelector(state => state.todos.loading)
  console.log(loading)
  return (
    <>
    {loading &&
      <div className="sk-fading-circle m-0 position-absolute top-50 start-50 translate-middle">
        <div className="sk-circle1 sk-circle"></div>
        <div className="sk-circle2 sk-circle"></div>
        <div className="sk-circle3 sk-circle"></div>
        <div className="sk-circle4 sk-circle"></div>
        <div className="sk-circle5 sk-circle"></div>
        <div className="sk-circle6 sk-circle"></div>
        <div className="sk-circle7 sk-circle"></div>
        <div className="sk-circle8 sk-circle"></div>
        <div className="sk-circle9 sk-circle"></div>
        <div className="sk-circle10 sk-circle"></div>
        <div className="sk-circle11 sk-circle"></div>
        <div className="sk-circle12 sk-circle"></div>
      </div>
    }
    </>
  )
}

export default Spinner