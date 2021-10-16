import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
// will remove later
import { useUserContext } from '../context/user_context';
import {LoadingStart} from '../components/LoadingStart'

const PrivateRoute = ({children, ...rest}) => {
  const {userLoading, isAuthenticated, user} = useUserContext();

  const isUser = isAuthenticated;


  return (
  <Route {...rest} render={() => {
    return isUser ? children : <Redirect to='/login'></Redirect>
  }}></Route>
  );
};
export default PrivateRoute;
