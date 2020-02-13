import React from 'react';
import { Component } from 'react';
import Home from './components/Home'
import {  BrowserRouter as Router,   Route , Switch} from "react-router-dom";
import ProductDetails from './components/ProductDetails';
import CheckoutPage from './components/CheckoutPage';
import CartDetails from './components/CartDetails';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route exact path="/product" component={ProductDetails} />
              <Route exact path="/cart-details" component={CartDetails} />
              <Route exact path="/checkout"><CheckoutPage /></Route>
            </Switch>
        </Router>
      </div>
    ) ;
  }
}
export default App;
