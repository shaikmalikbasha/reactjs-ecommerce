import React, { Component } from 'react';
import {Col, Row, Card, Container} from "react-bootstrap";
class AllProducts extends Component {
  render() {
    let cardStyle = {
        marginBottom : 10,
    };
    let amountStyle = { color:'green'}
    console.log(this.props);
    return(
        <div className="products-list">
          <Container style={{marginTop:10}}>
            <Row>
              {this.props.data.map(item => (
                <Col style={cardStyle} lg={3} key={item.id}>
                  <Card>
                    <Card.Img variant="top" src={`/images/${item.logo }`} />
                    <Card.Body>
                      <Card.Title><b>{item.title}</b></Card.Title>
                      <Card.Text>
                          <b>₹ : <span style = {amountStyle}>{item.price }</span></b>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
    );
  }
}
export default AllProducts;