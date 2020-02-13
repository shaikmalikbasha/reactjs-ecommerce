import React, { Component } from 'react';
import Header from './Header';
import Media from 'react-bootstrap/Media';
import EmptyCart from './EmptyCart';
import CartSummary from './CartSummary';
class CartDetails extends Component {
  constructor() {
    super();
    this.state = {
        items : [],
        results : [],
        itemIds : [],
        quantity : '',
        cartStatus : false
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }
  componentDidMount() {
    var token = sessionStorage.getItem('Token');
    console.log("I am ComponentDidMount");
    if((token === null) || (token.length === 0)|| (token === 'null') || (token === undefined))
    {
        console.log("Status : User not logged in..");
        this.setState({
            cartStatus : true
        });
    } else {
      fetch("http://laravel.local/api/cart-details",{
        method: 'GET',  
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+token
        }
      })
      .then(res => res.json())
      .then(json => {
        this.setState({
            items : json
        })
      });
      console.log("State data in Product Detail Page:",this.state.items);
    }
  }
  reloadPage() {
    console.log("I am coming upton reload Function........");
  }
  updateCart(e) {
    this.setState({ quantity : e.target.value } );
    console.log(this.state.quantity);
  }
  onUpdate(cart_id,quantity,originalQuantity) {
    var token = sessionStorage.getItem('Token');
    if((quantity < 1) || (quantity === originalQuantity) || (quantity === " "))
    {
      alert("Please provide proper Quantity..");
    } else {
      var data = {
        'no_of_items' : quantity,
        'cart_id'     : cart_id
      };
      fetch('http://laravel.local/api/cart-update',{
        method: 'POST',  
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+token
        },
        body : JSON.stringify(data),
      })
      .then(res => res.json())
      .then(json => {
        console.log("Response : ",json);
        this.componentDidMount();
      });
    }
  }
  deleteItem(itemId) {
    var token = sessionStorage.getItem('Token');
    if(window.confirm("Are you sure want to delete this Item .?")) {
      console.log(itemId);
      var data = {
        cart_id : itemId
      };
      fetch('http://laravel.local/api/cart-delete',{
        method: 'POST',  
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer '+token
        },
        body : JSON.stringify(data),
      })
      .then(res => res.json())
      .then(json => {
        this.setState({
            results : json,
        }) ;
        this.componentDidMount();
      });

    }
  }
  render() {
    var items = this.state.items;
    console.log("I am render,,");
    var amount = 0 , GREY = '#cccccc';
    var extraCSS = {
        marginTop : 10 ,
        padding : 3,
        boxShadow: `0px 0px 2px 2px ${GREY}`,
    };    
    for(var index in items) {
        amount = amount + parseFloat(items[index].product_price * items[index].no_of_items);
    }
    return(
      <div className="cart-wrapper">
          <Header/>
          <div className="container">
              <dt><h2><mark>My Shopping Cart :</mark></h2></dt>
              <ul className="list-unstyled">
                {items.map(item => (
                  <Media as="li" className="cart-list-item" key={item.id} style={extraCSS}>
                      {/* <Link to={`/product?id=${item.id}`}> */}
                          <img width={64} height={64} className="mr-3" style={{marginTop:20}} src={`/images/${item.product_logo }`} alt="File of Your Selected Item!" />
                      {/* </Link> */}
                      <Media.Body>
                          <div className="row" style={{marginTop:20}}>
                              <div className="col-md-2">
                                <p>
                                  <dt>Product Name : </dt>
                                  <dd>{item.product_title}</dd>
                                </p>
                              </div>
                              <div className="col-md-4">
                                <p>
                                  <dt>Description : </dt>
                                  <dd>{item.product_description}</dd>
                                </p>
                              </div>
                              <div className="col-md-2">
                                <p>
                                  <dt>Amount : </dt>
                                  <dd>{ item.product_price * item.no_of_items }</dd>
                                </p>
                              </div>
                              <div className="col-md-2" align="center">
                                <p>
                                  <dt>Selected Qty : <font style={{fontSize:15,color:`green`,fontFamily:`Times New Roman`}}>[ {item.no_of_items} ]</font></dt>
                                  <dd><input type="number" onChange={this.updateCart} placeholder="  Update" className="form-control"  min={1}/></dd>
                                  <button type="button" onClick={() => this.onUpdate(item.id, this.state.quantity, item.no_of_items)} className="btn btn-sm btn-warning">Update</button>
                                </p>
                              </div>
                              <div className="col-md-2" align="center">
                                <button type="button" onClick={() => this.deleteItem(item.id)} className="btn btn-danger btn-sm deleteItem" data-name={`${item.id}`}>Delete</button>
                              </div>
                          </div>
                      </Media.Body>
                  </Media>
                ))}                        
              </ul>
                  
            {this.state.cartStatus && <EmptyCart/>}              
            {!(this.state.cartStatus) && <CartSummary amount={amount} data = {this.state.items} />}                 
              <br /><br /><br />
          </div>
      </div>
    );
  }
}
export default CartDetails;
