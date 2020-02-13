import React, { Component } from 'react';
import { Container, Row , Col, Table ,Form } from 'react-bootstrap';
class Login extends Component
{
    constructor()
    {
        super();
        this.state = {
            email : '',
            password : '',
            status : '',
            message : ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.successCall = this.successCall.bind(this);
    }
    successCall(object)
    {
        console.log("Message :" , object.Message);
        if(object.Code === 401)
        {
            alert("Error : "+object.Message);
            this.setState({message : object.Message});
        }
        else
        {
            sessionStorage.setItem("Token",object.token);
            console.log("Message :" , object.Message);
            window.location.reload(false);
        }
    }
    handleSubmit(event)
    {
        fetch('http://laravel.local/api/login',{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(this.state),
        })
        .then(res => res.json())
        .then(json => {
            this.setState({
               status : json
            } , () => { this.successCall(this.state.status) })
        });
        event.preventDefault();
    }
    render()
    {
        return(
            <div className="login-wrapper">
                <Container style={{marginTop:10,marginBottom:10}}>
                    <Row>
                        <Col lg={12} align="center">
                            <Form onSubmit={this.handleSubmit}>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <td align="center" colSpan={2}><h1>Log In</h1></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td align="right"><b>Email ID : </b></td>
                                            <td align="left"><Form.Control type="email" onChange={(item) => { this.setState({ email : item.target.value }) }} placeholder = " Please type your Email ID here.." required /></td>
                                        </tr>
                                        <tr>
                                            <td align="right"><b>Password : </b></td>
                                            <td align="left"><Form.Control type="password" onChange={(item) => { this.setState({ password : item.target.value }) }}  placeholder = " Please type your password here.." required  /></td>
                                        </tr>
                                        <tr>
                                            <td align="center" colSpan={2}>
                                                <input type="submit" className="btn btn-success"  value="Login" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <p className="text text-danger">{this.state.message}</p>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Login;