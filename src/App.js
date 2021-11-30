import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import { LoadingStart } from "./components/LoadingStart";
import { ShowGlobalTexts } from "./components/ShowGlobalTexts";
import { useUserContext } from "./context/user_context";

import {
  About,
  Cart,
  Checkout,
  Error,
  PrivateRoute,
  Products,
  SingleProduct
} from './pages'

import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Signup from './pages/Signup'

const Home = lazy(() => import('./pages/HomePage'));


function App() {
  const [ spinner, setSpinner ] = useState(true);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 2000)
  }, []);

  const {userLoading} = useUserContext()
  if(userLoading || spinner) {
    return (
      <div className='start-loading--center'>
        <LoadingStart/>
      </div>
    )
  }

  return (
    <Router>
      <Navbar />
      <Sidebar />
      <ShowGlobalTexts/>
        <Switch>
          <Route exact path="/">
           <Suspense fallback={''}>
            <Home />
          </Suspense>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route path="/resetPassword/:token">
            <ResetPassword />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/products/:id" children={<SingleProduct />}></Route>
          <PrivateRoute path='/checkout' exact children={<Checkout />}/>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;


