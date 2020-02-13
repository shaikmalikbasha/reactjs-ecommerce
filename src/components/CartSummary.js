import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class CartSummary extends Component {
  render() {
    return(
      <div className="cart-summary-container">
        <div className="row" style={{fontFamily:`Times New Roman`,fontStyle:`bold`,fontWeight:`bold`}}>
          <div className="col-md-2"></div>
          <div className="col-md-3" align="right">
            <h1>Total : </h1>
          </div>
          <div className="col-md-3" align="center">
            <h1 className="" style={{background:`pink`}}><span style={{fontSize:25,color:`blue`}}>₹</span>{this.props.amount}</h1>
          </div>
          <div className="col-md-4" align="center">
            <Link to={{
                pathname :'/checkout',
            }}>
              <button className="btn btn-dark btn-lg">Proceed</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }    
}
export default CartSummary;