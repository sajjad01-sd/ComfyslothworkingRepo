import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const PrivateRoute = ({children, ...rest}) => {
  const {isLogin} = useUserContext();

  return (
    <Route {...rest} render={() => {
      return isLogin() ? children : <Redirect to='/login'></Redirect>
    }}></Route>
    );
};

export default PrivateRoute;
