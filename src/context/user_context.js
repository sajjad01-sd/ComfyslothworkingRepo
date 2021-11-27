import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/user_reducer'
import axiosInstance from '../utils/axiosInstance';
import {getToken} from '../utils/helpers';
import useGlobalState from '../globalState/globalState'


const initalState = {
  user: [],
  isAuthenticated: false,
  userLoading: false,
  kickout: false,
}

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState)
  

  //error handle with globalstate
  const [globalError, setGlobalError] = useGlobalState('globalError')
  const setGlobalStateError = (value) => {
  
    setGlobalError(value)
    
  }


  //Login area start
  const userIntercting = async () => {
    try {
      // token check, if !token return 
      const token = getToken()
      if(!token) return ''

      dispatch({type: 'userLoading'})
      const response = await axiosInstance.get(`users/me`)
      const user = response.data.data.doc

      if(user) {
        dispatch({type: 'setUser', payload: user})
      }
      
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response);
      dispatch({type: 'userError'})
       // set error into the globalState
       setGlobalStateError(errorMessage.message)

    }
  }

  // calling userIntercting first
  useEffect(() => {
    userIntercting()
  }, [])


  const isLogin = () => { 
      const token = getToken();

      if(token) {
        return true
      }

  }

  

  const getUserLoggedIn = async (email, password) => {
    try {
      const response = await axiosInstance.post("users/login", {
        email, password,
      })
  
      const user = response.data.data.user
      const token = response.data.token;
  
      //set token into local storage
      localStorage.setItem("jwt", token);
    
      if(token) {
        dispatch({type: "setUser", payload: user})
      }
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response);
      
      // set error into the globalState
      setGlobalStateError(errorMessage.message)
    }
    
  }

  const userLogout = () => {
    localStorage.removeItem('jwt')
    dispatch({type: "userLogout"})
  }
  //Login area end

  //Signup area start
  const userCreateAccount = async (name,email,password,passwordConfirm) => {
      try {
        const response = await axiosInstance.post("/users/signup", {
          name,
          email,
          password,
          passwordConfirm,
        })

        const user = response.data.data.user
        const token = response.data.token;
  
        //set token into local storage
      localStorage.setItem("jwt", token);

      
        if(token) {
          dispatch({type: "setUser", payload: user})
        }
      } catch (error) {
        const errorMessage = JSON.parse(error.request.response);
         // set error into the globalState
        setGlobalStateError(errorMessage.message)
      }
  }
  //Signup area end

  // password forgot start
  const forgotPassword = async (email) => {
       try {
         const response = await axiosInstance.post('users/forgotPassword', {
           email
         })

         
         if(response.data.message) {
           alert('Your password reset link sent to your email address')
         }
       } catch (error) {
        const errorMessage = JSON.parse(error.request.response);
         // set error into the globalState
        setGlobalStateError(errorMessage.message)
       }
  };
  // password forgot end

  // password Reset start
  const resetPassword = async (token,password,passwordConfirm) => {
      try {
        const response = await axiosInstance.patch(`users/resetPassword/${token}`, {
          password,
          passwordConfirm
        })


        const user = response.data.data.user
        const userToken = response.data.token;
  
        //set token into local storage
        localStorage.setItem("jwt", userToken);

        if(token) {
          dispatch({type: "setUser", payload: user})
        }
      } catch (error) {
        const errorMessage = JSON.parse(error.request.response);
         // set error into the globalState
        setGlobalStateError(errorMessage.message)
      }
  }
  // password Reset end

  // subscribe newsletter start
    const subscribeUser = async (email) => {
      try {
        const response = await axiosInstance.post('subcribers', {
          email
        })


        // show message into alert
        alert(response.data.message)
      } catch (error) {
         const errorMessage = JSON.parse(error.request.response);

          // set error into the globalState
        setGlobalStateError(errorMessage.message)
      }
    }
  // subscribe newsletter end



  return (
    <UserContext.Provider value={{...state, getUserLoggedIn, userLogout, userIntercting, isLogin, userCreateAccount, forgotPassword, resetPassword, subscribeUser}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
