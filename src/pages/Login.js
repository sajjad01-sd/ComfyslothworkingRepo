import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import lottie from 'lottie-web';


export const Login = () => {

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

    return (
        <>
        <PageHero title="Login"></PageHero>
        <Wrapper>
            <div className='content-area'>
                
                <form action="">
                <h2>Log in.</h2>
                <p>Log in with data that you entered during registration</p>

                <label htmlFor="">Email</label><br/>
                <input type="email" /><br/>

                <label htmlFor="">Password</label><br/>
                <input type="password" /><br/>

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
            padding: .5rem .4rem;
            font-size: 1.4rem;
            width: 120%;
            color: #000;
            font-weight: 700;
            margin-top: 1rem;
            background: var(--clr-primary-8);
            cursor: pointer;
            transition: all .2s;


            &:hover {
                background: var(--clr-primary-6);
            }
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