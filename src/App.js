import React, { useEffect } from 'react';
import Header from './Components/Header';
import Home from './Components/Home';
import Payment from './Components/Payment'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './Components/Checkout'
import Login from './Components/Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Components/Orders';

const promise = loadStripe('pk_test_51IwloDSGByQzW6SVBS8MBbXVfvclRKqZoopS7pXi7rxUnHFGykjfiYFFu9V683LW1brqJBgiTo3SSGC3YzQQfbuL00X6x5ThYY');

function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('the user is >>>', authUser);

      if (authUser) {
        // the user logged in/ the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div>
        <Switch>
        <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/Payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
