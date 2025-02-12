import React from 'react'
import { useSelector } from 'react-redux'

const useToken = () => {
  const authToken = useSelector(state => state.todos.authToken)
  return {authToken}
}

export default useToken