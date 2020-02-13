import React, { Component } from 'react';
import OrderSuccessModel from './OrderSuccessModel';
class BillingShipping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            b_name    : '',
            b_address : '',
            b_city    : '',
            b_state   : '',
            b_country : '',
            b_mobile  : '',
            b_email   : '',
            s_name    : '',
            s_address : '',
            s_city    : '',
            s_state   : '',
            s_country : '',
            s_mobile  : '',
            s_email   : '',
            name_in_card : '',
            cart_type    : '',
            total_amount : '',
            card_number  : '',
            expiry_month  : '',
            expiry_year  : '',
            security_code: '',
            sales_tax    : 4,
            shipping_charges : 10,
            isChecked      : true,
            result   : [],
            resultStatus : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.copyData = this.copyData.bind(this);
        this.validateData = this.validateData.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.getTotalAmount = this.getTotalAmount.bind(this);
    }

    handleChange(key) {
        return function(e) {
            var state = {};
            state[key] = e.target.value;
            this.setState(state);
        }.bind(this);
    }

    copyData() {
        if(this.state.isChecked)
        {
            this.setState({
                s_name    : this.state.b_name,
                s_address : this.state.b_address,
                s_city    : this.state.b_city,
                s_state   : this.state.b_state,
                s_country : this.state.b_country,
                s_mobile  : this.state.b_mobile,
                s_email   : this.state.b_email
            });
        } else {
            this.setState({
                s_name    : '',
                s_address : '',
                s_city    : '',
                s_state   : '',
                s_country : '',
                s_mobile  : '',
                s_email   : ''
            });

        }
    }

    handleChecked() {
        this.setState({ isChecked: !this.state.isChecked });
        this.copyData();
    }

    handleSubmit(event) {
        event.preventDefault();
        const total_amount = this.state.total_amount;
        const shipping_charges = this.state.shipping_charges;
        const sales_tax = this.state.sales_tax;
        const finalAmount = total_amount + shipping_charges + sales_tax;
        console.log("Final Amount : "+finalAmount);
        this.setState({ total_amount : finalAmount });
        console.log("Total Amout handleSubmit : "+this.state.total_amount);
        if(this.validateData(this.state))
        {
            this.placeOrder(this.state);
        }
    }

    placeOrder(data) {
        console.log(this.state);
        var token = sessionStorage.getItem('Token');
        if((token === null) || (token.length === 0)|| (token === 'null') || (token === undefined))
        {
           
        } else {
            fetch("http://laravel.local/api/place-order",{
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
                    result : json
                });
                if(this.state.result.Code === 200) {
                    console.log("Successfully Order placed...");
                    this.setState({ resultStatus : true });
                    alert("Successfully your Order Placed.");
                    console.log(this.state.result.Data.original);
                    window.location.replace("http://localhost:3000");
                }
            });
        }
    }
    validateData(data) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(!(isNaN(data['b_name'])) || !(isNaN(data['s_name']))) {
            console.log("Invalid Name, Please Enter proper Name");
            return false;
        }
        if((reg.test(data['b_email']) === false) ||(reg.test(data['s_email']) === false)) {
            console.log("Invalid Email, Please Enter proper Email Address..");
            return false;
        }
        if(!(isNaN(data['b_city'])) || !(isNaN(data['s_city']))) {
            console.log("Invalid City Name, Please Enter proper city Name");
            return false;
        }
        if(!(isNaN(data['b_state'])) || !(isNaN(data['s_state']))) {
            console.log("Invalid State Name, Please Enter proper State Name");
            return false;
        }
        if(!(isNaN(data['b_country'])) || !(isNaN(data['s_country']))) {
            console.log("Invalid Country Name, Please Enter proper Country Name");
            return false;
        }
        if((isNaN(data['b_mobile'])) || (isNaN(data['s_mobile']))) {
            console.log("Invalid Mobile number, Please Enter proper Mobile Number");
            return false;
        }
        if(!(isNaN(data['b_city'])) || !(isNaN(data['s_city']))) {
            console.log("Invalid City Name, Please Enter proper city Name");
            return false;
        }
        if(!(isNaN(data['name_in_card'])) || !(isNaN(data['name_in_card']))) {
            console.log("Invalid Name in card, Please Enter your Name properly.");
            return false;
        }
        if((data['card_number'].length < 16) || (data['card_number'].length > 16) || (isNaN(data['card_number'])) || (isNaN(data['card_number']))) {
            console.log("Invalid Card Number, Length must must be 16 and it contains only numbers..");
            return false;
        }
        if((data['security_code'] < 0 ) || (data['security_code'] > 9999) || (isNaN(data['security_code'])) || (isNaN(data['security_code']))) {
            console.log("Invalid Security Code");
            return false;
        }
        return true;
    }
    getTotalAmount() {
        var token = sessionStorage.getItem('Token');
        if((token === null) || (token.length === 0)|| (token === 'null') || (token === undefined))
        {
           
        }
        else
        {
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
                })
            });
        }
    }
    componentDidMount() {
        this.getTotalAmount();
    }
    render()
    {
        
        return(
            <div className="billing-shipping-container" style={{marginTop:20}}>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card text-white bg-dark mb-6">
                                    <div className="card-header"><h1>Billing Address:</h1></div>
                                    <div className="card-body">
                                        <table className="table table-borderless table-hover table-striped">
                                            <tbody>
                                                <tr>
                                                    <td colSpan={2}>
                                                        <div className="form-group">
                                                            <label className="text-white">Email ID:</label>
                                                            <input  value={this.state.b_email} onChange={this.handleChange('b_email')}  type="email" name="b_email" className="form-control" placeholder="Please Enter your Email ID here..." required />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label className="text-white">Full Name:</label>
                                                            <input  value={this.state.b_name}onChange={this.handleChange('b_name')}  type="text" name="b_name" className="form-control" placeholder="Please Enter your full name here..." required />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label className="text-white">House Number:</label>
                                                            <input  value={this.state.b_address} onChange={this.handleChange('b_address')}  type="text" name="b_address" className="form-control" placeholder="Please Enter your House number here..." required />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label className="text-white">City:</label>
                                                            <input  value={this.state.b_city} onChange={this.handleChange('b_city')}  type="text" name="b_city" className="form-control" placeholder="Please Enter your City name here..." required />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label className="text-white">State:</label>
                                                            <input  value={this.state.b_state} onChange={this.handleChange('b_state')}  type="text" name="b_state" className="form-control" placeholder="Please Enter your State name here..." required />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label className="text-white">Country:</label>
                                                            <input  value={this.state.b_country} onChange={this.handleChange('b_country')}  type="text" name="b_country" className="form-control" placeholder="Please Enter your Country name here..." required />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label className="text-white">Mobile Number:</label>
                                                            <input  value={this.state.b_mobile} onChange={this.handleChange('b_mobile')}  type="number" name="b_mobile" className="form-control" maxLength={10} placeholder="Please Enter your Mobile number here..." required />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card text-white bg-dark mb-6">
                                    <div className="card-header">
                                        <h1>Shipping Address:</h1>
                                        <p className="text-white"><label><input type="checkbox" style={{cursor:'pointer'}} onChange={ this.handleChecked } name="sameAddress"/> &nbsp; &nbsp;My Shipping and Billing Addresses are the same.</label></p>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-borderless table-hover table-striped">
                                            <tbody>
                                                <tr>
                                                    <td colSpan={2}>
                                                        <div className="form-group">
                                                            <label className="text-white">Email ID:</label>
                                                            <input  value={this.state.s_email} onChange={this.handleChange('s_email')}  type="email" name="s_email" className="form-control" placeholder="Please Enter your Email ID here..." required />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label className="text-white">Full Name:</label>
                                                            <input  value={this.state.s_name} onChange={this.handleChange('s_name')}  type="text" name="s_name" className="form-control" placeholder="Please Enter your full name here..." required />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label className="text-white">House Number:</label>
                                                            <input  value={this.state.s_address} onChange={this.handleChange('s_address')}  type="text" name="s_address" className="form-control" placeholder="Please Enter your House number here..." required />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label className="text-white">City:</label>
                                                            <input  value={this.state.s_city} onChange={this.handleChange('s_city')}  type="text" name="s_city" className="form-control" placeholder="Please Enter your City name here..." required />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label className="text-white">State:</label>
                                                            <input  value={this.state.s_state} onChange={this.handleChange('s_state')}  type="text" name="s_state" className="form-control" placeholder="Please Enter your State name here..." required />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <label className="text-white">Country:</label>
                                                            <input  value={this.state.s_country} onChange={this.handleChange('s_country')}  type="text" name="s_country" className="form-control" placeholder="Please Enter your Country name here..." required />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group">
                                                            <label className="text-white">Mobile Number:</label>
                                                            <input  value={this.state.s_mobile} onChange={this.handleChange('s_mobile')}  type="number" name="s_mobile" className="form-control" maxLength={10} placeholder="Please Enter your Mobile number here..." required />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                                                        
                            <div className="col-md-6" style={{marginTop:10}}>
                                <div className="card text-white bg-dark mb-6">
                                    <div className="card-header"><h1>Card Details:</h1></div>
                                    <div className="card-body">
                                        <table className="table table-borderless table-hover table-striped">
                                           <tbody>
                                            <tr>
                                                <td colSpan={2}>
                                                    <div className="form-group">
                                                        <label className="text-white">Name (As appears on card):</label>
                                                        <input type="text" name="name_in_card" className="form-control" onChange={this.handleChange('name_in_card')}  placeholder="Enter Your Name as appears on card"/>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="form-group">
                                                        <label className="text-white">Card Number:</label>
                                                        <input type="number" name="card_number"  onChange={this.handleChange('card_number')} className="form-control" placeholder="Enter Your card number"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="text-white">Security Code:</label>
                                                        <input type="number" name="security_code"  onChange={this.handleChange('security_code')} className="form-control" placeholder="Enter Your 4 digit security code"/>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <label className="text-white">Card Type:</label>
                                                        <select className="form-control" name="cart_type" onChange={this.handleChange('cart_type')} >
                                                            <option value="RuPay">RuPay</option>
                                                            <option value="Master Card">Master Card</option>
                                                            <option value="Visa">Visa</option>
                                                            <option value="Discovery">Discovery</option>
                                                            <option value="Amex">Amex</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="text-white">Expiry Time</label>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <select name="expiry_month" className="form-control" onChange={this.handleChange('expiry_month')} >
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
                                                                </select>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <select name="expiry_year" className="form-control" onChange={this.handleChange('expiry_year')} >
                                                                    <option value="2019">2019</option>
                                                                    <option value="2020">2020</option>
                                                                    <option value="2021">2021</option>
                                                                    <option value="2022">2022</option>
                                                                    <option value="2023">2023</option>
                                                                    <option value="2024">2024</option>
                                                                    <option value="2025">2025</option>
                                                                    <option value="2026">2026</option>
                                                                    <option value="2027">2027</option>
                                                                    <option value="2028">2028</option>
                                                                    <option value="2029">2029</option>
                                                                    <option value="2030">2030</option>
                                                                    <option value="2031">2031</option>
                                                                    <option value="2032">2032</option>                                                                   
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                           </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>                      
                            <div className="col-md-6" style={{marginTop:10}}>
                                <div className="card text-white bg-dark mb-6">
                                    <div className="card-header"><h1>Cart Recap:</h1></div>
                                    <div className="card-body">
                                        <table className="table table-borderless table-striped text-white">
                                           <tbody>
                                            <tr className="text-white">
                                                <td align="right" width="40%"><label>Merchandise :</label></td>
                                                <td> ₹ {this.state.total_amount}</td>
                                            </tr>
                                            <tr className="text-white">
                                                <td align="right"><label>Sales Tax :</label></td>
                                                <td> ₹ {this.state.sales_tax}</td>
                                            </tr>
                                            <tr className="text-white">
                                                <td align="right"><label>Shipping Charges :</label></td>
                                                <td> ₹ {this.state.shipping_charges}</td>
                                            </tr>
                                            <tr className="">
                                                <td align="right"><h4>Final Amount :</h4></td>
                                                <td><h1 style={{fontFamily:`Times New Roman`,fontWeight:`bold`,color:`#00FFFF`}}> <font style={{fontSize:20,color:`yellow`}}>₹</font> {this.state.total_amount + this.state.sales_tax + this.state.shipping_charges }</h1></td>
                                            </tr>
                                           </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>                     
                        </div>
                        <div className="col-md-12" align="center" style={{marginTop:10,marginBottom:30}}>
                            <input type="submit" name="submit" style={{width:"40%"}} value="Place Your Order" className="bnt btn-success btn-sm"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default BillingShipping;