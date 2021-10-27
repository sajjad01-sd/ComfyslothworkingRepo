import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { loadStripe } from "@stripe/stripe-js";
import {useCartContext} from '../context/cart_context'

import axiosInstance from '../utils/axiosInstance'
import { useUserContext } from '../context/user_context';
import { formatPrice } from '../utils/helpers';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const CheckoutForm = () => {
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  const {user} = useUserContext()


  // Payment for cart start
  const makePayment = async () => {
    try {
      const session = await axiosInstance.post('order/checkout-session-cart', {
        cart: cart,
      })

      const stripe = await stripePromise;

        const check = stripe.redirectToCheckout({
        sessionId: session.data.session.id
      })



      console.log(session);
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response);
      alert(errorMessage.message);
    }
  }
  // Payment for cart end

  // Test for payment or order single product start
  // const makePayment = async id => {
  //   try {
  //     const session = await axiosInstance.get(`order/checkout-session/614b55f5bad8be5be3cce67b`)

  //     console.log(session);

  //     const stripe = await stripePromise;

  //     stripe.redirectToCheckout({
  //       sessionId: session.data.session.id
  //     })

      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // Test for payment or order single product end

  return (
    <div className='center_area'>
      <div className="user_details">
        <h3>Hello, {user.name}</h3>
        <p className='total_price'>Your total is {formatPrice(total_amount)}</p>
      </div>
      <div className="payment_area">
      <button onClick={() => makePayment()}>Make A Payment</button>
      </div>
    </div>
  )
}

const StripeCheckoutComponent = () => {
  return (
    <Wrapper>
      <CheckoutForm /> 
    </Wrapper>
  )
}

const Wrapper = styled.section`
.center_area {
  text-align: center;
}
  .total_price {
    font-size: 1.4rem;
  }

  .payment_area {
    padding: 2rem 5rem;
    border: 2px solid #00000069;
  }
  /* form {
    width: 30vw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  } */
  /* .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  } */
  /* #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(150%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: '';
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`

export default StripeCheckoutComponent
