import React,{ Component } from 'react';
import { Col , Row , } from 'react-bootstrap';
import {Card,Container} from "react-bootstrap";
import {Link} from 'react-router-dom';

class Products extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            items : [],
            isLoaded : false,
            path : '/images/',
        }
    }
    componentDidMount()
    {
        fetch("http://laravel.local/api/products",{
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
        let cardStyle = {
            marginBottom : 10,
        };
        let amountStyle = {
            color:'green'
        };
        var {isLoaded} = this.state;
        if(!isLoaded)
        {
            return <div align="center">Please wait it's Loading...</div>;
        }
        else
        {
            return (
                <Container style={{marginTop:10}}>
                    <Row>
                        {this.state.items.map(item => (                            
                            <Col style={cardStyle} lg={3} key={item.id}>
                                <Link to={`/product?id=${item.id}`}>
                                    <Card>
                                        <Card.Img variant="top" src={`/images/${item.logo }`} />
                                        <Card.Body>
                                            <Card.Title><b>{item.title}</b></Card.Title>
                                            <Card.Text>
                                                <b>₹ : <span style = {amountStyle}>{item.price }</span></b>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>                            
                        ))}
                    </Row>
                </Container>
            );
        }
    }
}
export default Products;