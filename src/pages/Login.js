import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'

export const Login = () => {
    return (
        <>
        <PageHero title="Login"></PageHero>
        <Wrapper>

            <form action="">
            <h2>Log in.</h2>
            <p>Log in with data that you entered during registration</p>

            <label htmlFor="">Email</label><br/>
            <input type="email" /><br/>

            <label htmlFor="">Password</label><br/>
            <input type="password" /><br/>
            </form>

            <div>
                jjsdfjdsjkfkjdjkf
            </div>

        </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    position: relative;
    padding: 12rem 0;
    display: flex;
    justify-content: space-around;
    align-items: center;

    /* form {
        position: relative;
        top: 40%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    } */
`