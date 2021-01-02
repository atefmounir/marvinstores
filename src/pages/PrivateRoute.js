import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({children,...rest}) => {
  const myUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) :null

  return (
    <Route
      {...rest}
      render={() => {
        return myUser ? children : <Redirect to='/'/>
      }}
    />
  )
}

export default PrivateRoute


/*
  Notes
  children will grape any wrapped component like Checkout component. check App.js
  rest operator will grape and additional props attached with PrivateRoute component. check App.js
*/