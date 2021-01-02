import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUserContext } from '../context/user_context'

const PrivateRoute = ({component:Component,...rest}) => {
  const {myUser} = useUserContext()

  return (
    <Route {...rest} render={props => (
      myUser ? <Component {...props}/> : <Redirect to={{
        pathname: "/",
        state: {from: props.location}
      }}/>
    )}/>
  )
}

export default PrivateRoute


/*
  Notes
  children will grape any wrapped component like Checkout component. check App.js
  rest operator will grape and additional props attached with PrivateRoute component. check App.js
*/