import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class EmptyCheckout extends Component {
    render() {
        return(
            <div className="empty-checkout-page">
                <div className="container" style={{marginTop:10}}>
                    <div className="alert alert-danger" role="alert" align="center">
                        <h1 className="alert-heading">OOPS!</h1>
                            <img src="./images/cart_is_empty.png" width="30%" height="250" alt="this is Empty cart file" />
                        <hr />
                        <p className="mb-0">There are no Merchandise Items in the Cart</p>
                    </div>
                </div>
                <div className="container" align="center" style={{marginTop:20}}>
                    <Link to="/">
                        <button className="btn btn-info">Home</button>
                    </Link>
                </div>
            </div>
        );
    }
}
export default EmptyCheckout;