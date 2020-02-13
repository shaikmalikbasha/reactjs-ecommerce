import React, { Component } from 'react';
import BillingShipping from './BillingShipping';
import EmptyCheckout from './EmptyCheckout';
class CheckoutPage extends Component {
  constructor() {
    super();
    this.state = {
      total_amount : '',
      billing : false
    };
    this.getTotalAmount = this.getTotalAmount.bind(this);
  }

  getTotalAmount() {
    var token = sessionStorage.getItem('Token');
    if((token === null) || (token.length === 0)|| (token === 'null') || (token === undefined)) {
        
    } else {
        fetch("http://laravel.local/api/total-amount",{
          method: 'GET',  
          headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer '+token
          }
        })
        .then(res => res.json())
        .then(json => {
          this.setState({
            total_amount : json
          });
          if(this.state.total_amount > 0) {
            this.setState({
                billing : true
            });
          }
        });
    }
  }

  componentDidMount() {
    this.getTotalAmount();
  }

  render() {
    return(
      <div className="check-out-confirm">
        {this.state.billing ? <BillingShipping/> : <EmptyCheckout/> }
      </div>
    );
  }
  
}
export default CheckoutPage;