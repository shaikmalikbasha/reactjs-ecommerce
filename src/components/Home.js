import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Products from './Products';
class Home extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            hint : '',
            items : [],
            itemsCount : 0,
            redirect : false
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
    }
    handleSubmit(event)
    {
        event.preventDefault();        
        if(this.state.hint.length < 3)
        {
            alert("Please type atleast 3 characters...");
        }
        else
        {
            this.setState({
                redirect : true
            });
        }
    }
    render()
    {
        if(this.state.redirect)
        {
           return <Redirect to='/Tab1' data = {{
               id:123,
           }}/>
        }
        return(
            
            <div className="products-wrapper">
                <Header />
                <Products />
            </div>
        );
    }
}
export default Home;