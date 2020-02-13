import React , { Component} from 'react';
import NotFound from './NotFound';
import { Container, Row, Col, Card , Table, Button } from 'react-bootstrap';
import Header from './Header';
class ProductDetails extends Component {
    constructor() {
        super();
        this.state = {
            items : [],
            isLoaded : false,
            cartStatus : '',
            res : [],
        }
        this.addToCart = this.addToCart.bind(this);
        this.updateCart = this.updateCart.bind(this);
    }
    updateCart(e) {
        if (e.target.value === 0) {
            alert("Please select proper Quantity");
        } else {
            // this.setState({ quantity : e.target.value } );
            this.state.items.quantity = e.target.value;
            console.log(this.state.items.quantity);
        }        
    }
    addToCart() {
        var token = sessionStorage.getItem('Token'); 
        if((token === null) || (token.length === 0)|| (token === 'null') || (token === undefined))
        {
            alert("Please Login with Authorized details");
        }
        else
        {
            fetch("http://laravel.local/api/add-to-cart",{
                method: 'POST',  
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer '+token
                },
                body : JSON.stringify(this.state.items),
            })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    cartStatus : 'Successfully Added to Cart',
                    res : json
                })
            });
            console.log("State data in Product Detail Page:",this.state.items.id);
            alert("Successfully Added to your cart..");
        }
    }
    componentDidMount()
    {
        const url = this.props.location.search;
        const splittingArray = url.split("=");
        const q = splittingArray[1];
        console.log("Location URL :",window.location.href);
        fetch("http://laravel.local/api/product-details/"+q , {
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded : true,
                items : json,
            })
        });
    }
    render()
    {
        var {isLoaded} = this.state;
        let cardStyle = {
            marginBottom : 10,
        };
        let amountStyle = {
            color:'brown'
        };
        var dis = false , link_text = 'Add to Cart';
        if(sessionStorage.getItem('Token')===null)
        {
            dis = true;
            link_text = 'Please Login to get this Item.';
        }
        if(!isLoaded)
        {
            return <div align="center"><h1>Please wait it's Loading...</h1></div>;
        }
        else
        {
            return (
                <div>
                    <Header />
                    {this.state.notFound && <NotFound />}
                   <Container style={{marginTop:10}}>
                       <Row>
                            <Col style={cardStyle} lg={6}>
                                <Card>
                                    <Card.Img variant="top" src={`/images/${this.state.items.logo}`} />
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <td align="center" colSpan ={2}>
                                                <h1 align="center" className="text text-success">
                                                    Product Details
                                                </h1>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td align="right" width="50%">Product Name : </td>
                                            <td align="left"><h4>{this.state.items.title}</h4> </td>
                                        </tr>
                                        <tr>
                                            <td align="right">Product Description : </td>
                                            <td align="left"><h4>{this.state.items.description}</h4> </td>
                                        </tr>
                                        <tr>
                                            <td align="right">Product Amount : </td>
                                            <td align="left"><h4 style={amountStyle}>₹ {this.state.items.price * this.state.items.quantity}</h4> </td>                                            
                                        </tr>
                                        <tr>
                                            <td align="right">Select Quantity : </td>
                                            <td align="left">
                                                <select className="form-control" onChange={this.updateCart}>
                                                    <option value="0">Select Quantity</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                    <option value="16">16</option>
                                                    <option value="17">17</option>
                                                    <option value="18">18</option>
                                                    <option value="19">19</option>
                                                    <option value="20">20</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" colSpan={2}>
                                                <Button variant="outline-success" onClick={this.addToCart} disabled={dis}>{link_text}</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>                        
                       </Row>
                   </Container>
                </div>
            );
        }
    }
}
export default ProductDetails;