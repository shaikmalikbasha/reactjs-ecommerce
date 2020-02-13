import React from 'react';
function EmptyCart() {
    return(
        <div className="empty-cart-container">
            <div className="container" style={{marginTop:10}}>
                <div className="alert alert-danger" role="alert" align="center">
                    <h1 className="alert-heading">OOPS!</h1>
                        <img src="./images/cart_is_empty.png" width="30%" height="250" alt="this is Empty cart file" />
                    <p>Your Cart is Looking empty, this is because you are not loged in into your Account</p>
                    <hr />
                    <p className="mb-0">Please hit the Login button which appears at top-right corner to Login.</p>
                </div>
            </div>
        </div>
    );
}
export default EmptyCart;