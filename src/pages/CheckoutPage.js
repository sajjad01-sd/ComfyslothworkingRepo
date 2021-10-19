import React, { useState } from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link, Redirect } from "react-router-dom";
import { useUserContext } from "../context/user_context";
import { checkAuthentication } from "../utils/helpers";

const CheckoutPage = () => {
  const {cart} = useCartContext();
  const {kickout} = useUserContext();

// kickout from this route
  if(kickout) {
    return (
      <Redirect to='/login'></Redirect>
    )
  }
 

  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {cart.length < 1 ? (
          <div className="empty">
            <h2>Your cart is empty</h2>
            <Link to='/products' className='btn'>fill it</Link>
          </div>
        ) : (
          <StripeCheckout/>
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
