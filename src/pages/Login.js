import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import lottie from 'lottie-web';
import { Link, Redirect } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { checkAuthentication } from '../utils/helpers';


export const Login = () => {
    const {getUserLoggedIn, isAuthenticated, user, forgotPassword} = useUserContext();
    const [resetOpen, setResetOpen] = useState(false);
    const [state, setState] = useState({
        email: '',
        password: ''
    })

     // if authented redirect 
    const authented = checkAuthentication(isAuthenticated, user);

 
    // animated svg area start
    const container = useRef(null)

    useEffect(() => {
        lottie.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: require('../assets/SVG/Login Colored.json')
        })
      }, []);
    // animated svg area end

      const handleLogin = () => {
        getUserLoggedIn(state.email, state.password)

        setState({...state, email: '', password: ''})
      };

      const handleForgotPassword = () => {
        forgotPassword(state.email)
        setState({...state, email: ''})
      }

      if(authented) {
        return (
            <Redirect to='/checkout'></Redirect>
        )
    }

        return (
            <>
            <PageHero title="Login"></PageHero>
            <Wrapper>
                <div className='content-area'>
                    
                    {/* if resetOpen show reset form or show login form*/}

                    {resetOpen ? 
                    <form action="" onSubmit={(e) => {
                        e.preventDefault();
                        handleForgotPassword()
                    }}>
                        <h2>Reset Password.</h2>
                        <h5>We will send you an email to reset your password.</h5>

                        <label htmlFor="">Email</label><br/>
                        <input value={state.email} type="email" onChange={(e) => setState({...state, email: e.target.value})} /><br/>

                         <button className='submit-btn' type='submit'>Submit</button>
                        <button className='Cancel-btn' onClick={() => setResetOpen(false)}>Cancel</button>
                        
                    </form>
                    : 
                    <form action="" onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin()
                    }}>
                        <h2>Log in.</h2>
                        <p>Log in with data that you entered during registration.</p>
        
                        <label htmlFor="">Email</label><br/>
                        <input type="email" value={state.email} onChange={(e) => setState({...state, email: e.target.value})}/><br/>
        
                        <label htmlFor="">Password</label><br/>
                        <input type="password" value={state.password} onChange={(e) => setState({...state, password: e.target.value})}/><br/>
        
                        <p className='forgot_pass' onClick={() => setResetOpen(true)}>Forgot your password?</p>
        
                        <h5>Don't have account? Please <Link to='/signup' className='signUp_btn'>Sign Up</Link></h5>
        
                        <button className='submit-btn' type='submit'>Submit</button>
                    </form>}
                    
    
                    <div>
                    <div className="container" ref={container}></div>
                    </div>
                </div>
    
            </Wrapper>
            </>
        )
    

}

const Wrapper = styled.div`
    .content-area {
        position: relative;
        padding: 0rem 0 0 10rem;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-around;
        margin-top: -7rem;
    }
   
    .container {
        width: 50rem; 
        height: 50rem;
    }

    form {
        label {
            font-size: 1.5rem;

        }
        input {
            padding: .5rem .4rem;
            font-size: 1.4rem;

            width: 100%;
            border: 5px solid var(--clr-primary-10);
            transition: all .2s;

        }

        button {
           
        }
        h5 {
            margin: 0;
            margin-bottom: 0 !important;
            padding: 0;
            margin-top: .7rem;
            margin-left: .1rem;
        }

      
    }
    .signUp_btn {
        font-size: 1.4rem;
        color: black;
        text-decoration-line: underline !important;
    }

    .forgot_pass {
        font-size: 1.3rem;
        margin: 0 !important;
        color: black;
        display: block;
        cursor: pointer;
        transition: all .2s;

        &:hover {
            color: var(--clr-red-dark);
        }

    }

    .submit-btn {
        padding: .5rem .4rem;
        font-size: 1.4rem;
        margin-top: .4rem;
        width: 120%;
        color: #000;
        font-weight: 700;
        
        background: var(--clr-primary-8);
        cursor: pointer;
        transition: all .2s;



        &:hover {
            background: var(--clr-primary-6);
        }
    }

    .Cancel-btn {
        background: none;
        border: none;
        font-size: 1.6rem;
        margin-top: .5rem;
        cursor: pointer;
        color: black;
        transition: all .2s;


        &:hover {
            color: var(--clr-red-dark);
        }


    }

    @media (max-width: 1300px) {
        .content-area {
            margin-top: 2rem;
            padding: 0rem 0 0 4rem;
        }
        .container {
            width: 45rem; 
            height: 45rem;
        }
    }

    @media (max-width: 992px) {
        .content-area {
            flex-direction: column;
            margin-top: 2rem;
            padding: 0rem 0 0 1rem;
        }
        .container {
            width: 40rem; 
            height: 40rem;
        }
    }
    @media (max-width: 600px) {
        .content-area {
            flex-direction: column;
            margin-top: 2rem;
            padding: 0rem 0 0 1rem;
        }
        .container {
            width: 20rem; 
            height: 20rem;

        }

        button {
            width: 50% !important;
        }

        label {
            font-size: 1.2rem;

        }
        input {
            padding: .2rem .2rem;
            font-size: 1.2rem;

            width: 70%;
            border: 5px solid var(--clr-primary-10);
            transition: all .2s;

            
        }
    }
    
    /* form {
        position: relative;
        top: 40%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    } */
`