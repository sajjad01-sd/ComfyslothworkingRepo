import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import { LoadingStart } from "./components/LoadingStart";
import Loading from "./components/Loading";
import { ShowGlobalTexts } from "./components/ShowGlobalTexts";
import { useUserContext } from "./context/user_context";


const About = lazy(() => import('./pages/AboutPage'));
const Cart = lazy(() => import('./pages/CartPage'));
const Checkout = lazy(() => import('./pages/CheckoutPage'));
const Error = lazy(() => import('./pages/ErrorPage'));
const Home = lazy(() => import('./pages/HomePage'));
const PrivateRoute = lazy(() => import('./pages/PrivateRoute'));
const Products = lazy(() => import('./pages/ProductsPage'));
const SingleProduct = lazy(() => import('./pages/SingleProductPage'));

const Login = lazy(() => import('./pages/Login'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Signup = lazy(() => import('./pages/Signup'));


function App() {
  const {userLoading} = useUserContext()
  if(userLoading) {
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
      <Suspense fallback={<Loading/>}>
        <Switch>
          <Route exact path="/">
            <Home />
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
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;


