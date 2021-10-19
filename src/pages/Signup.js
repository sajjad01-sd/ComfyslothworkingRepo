import React, { useEffect, useRef, useState } from 'react'
import lottie from 'lottie-web';
import styled from 'styled-components';
import { PageHero } from '../components';
import { Link, Redirect } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { checkAuthentication, redirectAfterSubmitUser } from '../utils/helpers';


export const Signup = () => {
    const container = useRef(null);
    const {userCreateAccount, user, isAuthenticated} = useUserContext()
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    // if authented redirect 
    const authented = checkAuthentication(isAuthenticated, user);
    
    
      useEffect(() => {
          lottie.loadAnimation({
              container: container.current,
              renderer: 'svg',
              loop: true,
              autoplay: true,
              animationData: require('../assets/SVG/Welcome.json')
            })
        }, []);
        
        const handleSubmit = (e) => {
            e.preventDefault();
            userCreateAccount(state.name, state.email, state.password, state.passwordConfirm)
            
            setState({...state, name: '', email: '', password: '', passwordConfirm: ''})
        }
        
        if(authented) {
            return (
                <Redirect to='/checkout'></Redirect>
            )
        }

    return (
        <>
        <PageHero title="Signup"></PageHero>
        <Wrapper>
            <div className='content-area'>
                
                <form action=""  onSubmit={(e) => handleSubmit(e)}>
                    <h2>Sign Up.</h2>
                    <p>Sign up with your data that you will use during registration.</p>
    
                    <label htmlFor="">Name</label><br/>
                    <input type="text" value={state.name} onChange={(e) => setState({...state, name: e.target.value})}/><br/>

                    <label htmlFor="">Email</label><br/>
                    <input type="email" value={state.email} onChange={(e) => setState({...state, email: e.target.value})}/><br/>
    
                    <label htmlFor="">Password</label><br/>
                    <input type="password" value={state.password} onChange={(e) => setState({...state, password: e.target.value})}/><br/>

                    <label htmlFor="">Password Confirm</label><br/>
                    <input type="password" value={state.passwordConfirm} onChange={(e) => setState({...state, passwordConfirm: e.target.value})} /><br/>
                    
    
                    <h5>Already have an account? <Link to='/login' className='signUp_btn'>Sign in</Link></h5>
    
                    <button>Submit</button>
                </form>

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
        margin-top: -2rem;
    }
   
    .container {
        width: 50rem; 
        height: 50rem;
        padding: 5rem;
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

    @media (max-width: 1300px) {
        .content-area {
            margin-top: 2rem;
            padding: 0rem 0 0 4rem;
        }
        .container {
            width: 40rem; 
            height: 40rem;
            padding: 4rem;
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
            padding: 2rem;

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
            padding: 0rem;


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