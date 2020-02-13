import React, { Component } from 'react';
import { Container, Row , Col, Table ,Form } from 'react-bootstrap';
class Register extends Component
{
    constructor()
    {
        super();
        this.state = {
            name : '',
            email : '',
            password : '',
            password1 : '',
            mobile : '',
            address : '',
            status : ''
        };
        this.setFullName = this.setFullName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setPassword1 = this.setPassword1.bind(this);
        this.setMobile = this.setMobile.bind(this);
        this.setAddress = this.setAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.successCall = this.successCall.bind(this);
    }
    setFullName(e)
    {
        this.setState({ name : e.target.value } );
    }
    setEmail(e)
    {
        this.setState({ email : e.target.value } );
    }
    setPassword(e)
    {
        this.setState({ password : e.target.value } );
    }
    setPassword1(e)
    {
        this.setState({ password1 : e.target.value } );
    }
    setMobile(e)
    {
        this.setState({ mobile : e.target.value } );
    }
    setAddress(e)
    {
        this.setState({ address : e.target.value } );
    }
    successCall(object)
    {
        if(Object.keys(object).length === 0)
        {
            alert("Something went Wrong !");
        }
        else
        {
            alert("Successfully Registered......");
        }
    }
    handleSubmit(event)
    {
        event.preventDefault();
        if(this.state.password === this.state.password1) {
            fetch('http://laravel.local/api/register',{
                method: 'POST',  
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(this.state),
            })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    status : json,
                })
            } , () => { this.successCall(this.state.status) });
        }
        else {
            alert("Passwords mismatch");
        }
    }
    render()
    {
        return(
            <div className="signup-wrapper">
                <Container style={{marginTop:10,marginBottom:10}}>
                    <Row>
                        <Col lg={12} align="center">
                            <Form onSubmit={this.handleSubmit}>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <td align="center" colSpan={2}><h1>Sign Up</h1></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td align="right"><b>Full Name : </b></td>
                                            <td align="left"><Form.Control type="text"  onChange={this.setFullName} name="fullname" placeholder = " Please enter your Full Name here.." title="Please enter your Full Name here.." required /></td>
                                        </tr>
                                        <tr>
                                            <td align="right"><b>Email ID : </b></td>
                                            <td align="left"><Form.Control type = "email" onChange={this.setEmail} name = "email" placeholder = " Please enter your Email ID here.." title = "Please enter your Email ID here.."  required /></td>
                                        </tr>
                                        <tr>
                                            <td align="right"><b>Password : </b></td>
                                            <td align="left"><Form.Control type="password"  onChange={this.setPassword} name="password" placeholder = " Please enter your password here.." title = "Please enter your password here.."  required /></td>
                                        </tr>
                                        <tr>
                                            <td align="right"><b>Confirm Password : </b></td>
                                            <td align="left"><Form.Control type="password"  onChange={this.setPassword1} name="password1" placeholder = " Please confirm your password here.." title = " Please confirm your password here.."  required /></td>
                                        </tr>
                                        <tr>
                                            <td align="right"><b>Mobile : </b></td>
                                            <td align="left"><Form.Control type="text"  onChange={this.setMobile} name="mobile" placeholder = " Please enter your mobile number here.." title = "Please enter your mobile number here.."  required /></td>
                                        </tr>
                                        <tr>
                                            <td align="right"><b>Address: </b></td>
                                            <td align="left"><Form.Control type="text"  onChange={this.setAddress} name="address" placeholder = " Please give your Address here.." title = "Please give your Address here.." required /></td>
                                        </tr>
                                        <tr>
                                            <td align="center" colSpan={2}>
                                                <input type="submit" className="btn btn-primary" value="Register" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Register;