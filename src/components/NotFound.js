import React, { Component } from 'react';
import { Container , Row, Col, Alert } from 'react-bootstrap';
class NotFound extends Component
{
    render()
    {
        return(
            <Container style={{marginTop:10}}>
                <Row>
                    <Col lg={12}>
                        <Alert variant = "danger">Sorry No Products Available Reagrding your Search</Alert>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Alert variant="success">Suggested Products</Alert>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default NotFound;