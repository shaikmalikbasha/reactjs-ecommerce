import React, { Component } from 'react';
import { Button,Form, Container, Row , Col } from 'react-bootstrap';
import {  BrowserRouter as Router,   Route , Link } from "react-router-dom";
import AllProducts from './AllProducts';
import Header from './Header';
class Home extends Component
{  
    constructor(props)
    {
        super(props);
        this.state = {
            hint : '',
            items : [],
            itemsCount : 0,
            searchStatus : true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount()
    {
        fetch("http://laravel.local/api/products",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(json => {
            this.setState({
                items : json,
            })
        });
    }

    handleChange(event)
    {
        this.setState({ hint : event.target.value });
        console.log(this.state.hint);  
    }
   
    handleSubmit(event)
    {
        // console.log('Name : '+this.state.hint);
        if(this.state.hint.length < 3 )
        {
            alert("Please type atleast 3 characters...");
        }
        else
        {
            fetch("http://laravel.local/api/search/"+(this.state.hint) , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(json => {
                this.setState({
                    items : json,
                    itemsCount:json.length,
                } , () => {
                    this.setState({
                        searchStatus : false
                    })
                })
            });
        }
        event.preventDefault();
        
    }
    changeStatus()
    {
        var {searchStatus} = this.state.searchStatus;
        this.setState({
            searchStatus : (searchStatus),
        });
    }  
    render()
    {
        let mystyle = {
            marginTop:10,
            marginBottom : 10,
            textAlign:'center'
        }
        return(
            <div className="home" id="homeData">
                <Container style={mystyle}>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col xl={9}>
                                <Form.Control type="text" value={this.state.value} placeholder = " Please type atleast 3 characters to enable search buttom " onChange={this.handleChange} />
                            </Col>
                            <Col xl={3}>
                                <Button variant="success" type="submit">Search</Button>
                            </Col>
                        </Row>
                    </Form>
                    {/* <Header /> */}
                    {this.state.searchStatus && <AllProducts data = {this.state.items} />}
                </Container>
            </div>
            
        );
    }
}
export default Home;