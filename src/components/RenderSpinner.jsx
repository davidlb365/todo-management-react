import React, { useContext } from 'react'
import { SpinContext } from '../context/SpinContext.js'
import Spinner from './Spinner.jsx'

const RenderSpinner = () => {
  const {loading} = useContext(SpinContext)
  return (
    <>
    {loading && <Spinner />}
    </>
  )
}

export default RenderSpinner