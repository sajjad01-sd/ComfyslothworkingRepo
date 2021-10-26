import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");

  if (cart === null) {
    return [];
  }
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  }
};

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // add to cart
  const addToCart = (_id, color, amount, product) => {
    console.log(_id);
    dispatch({ type: ADD_TO_CART, payload: { _id, color, amount, product } });
  };

  // remove item
  const removeItem = (_id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: _id });
  };
  // toggle amount
  const toggleAmount = (_id, value) => {
    console.log(_id, value);
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { _id, value } });
  };
  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
