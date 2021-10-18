import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import {LoadingStart} from '../components/LoadingStart'

const PrivateRoute = ({children, ...rest}) => {
  const {userLoading, isAuthenticated, user, isLogin} = useUserContext();

  return (
    <Route {...rest} render={() => {
      return isLogin() ? children : <Redirect to='/login'></Redirect>
    }}></Route>
    );
};

export default PrivateRoute;
