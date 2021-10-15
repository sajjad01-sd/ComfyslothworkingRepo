import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import reducer from '../reducers/user_reducer'
import {hostAddress} from '../utils/helpers';

const initalState = {
  user: [],
  isAuthenticated: false
}

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState)

  const getUserLoggedIn = async (email, password) => {
    const response = await axios({
      method: "POST",
      url: `${hostAddress}/users/login`,
      data: {
        email, password,
      }
    })

    console.log(response);
    const user = response.data.data.user
    const token = response.data.token;

    //set token into local storage
    localStorage.setItem("jwt", token);
  
    if(token) {
      dispatch({type: "setUser", payload: user})
    }
  }

  return (
    <UserContext.Provider value={{...state, getUserLoggedIn}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
