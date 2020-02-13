import React, { Component } from 'react';
import { Tabs, Tab , Container } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';
class Authentication extends Component {
  render() {
    return(
      <div className="authentication-container">
        <Container style={{marginTop:10,marginBottom:10}}>
          <div className="row justify-row-content">
            <div className="col-md-12">
              <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                <Tab eventKey="login" title="Login">
                  <Login />
                </Tab>
                <Tab eventKey="register" title="Sign Up">
                  <Register />
                </Tab>
              </Tabs>
            </div>
          </div>        
        </Container>
      </div>
    );
  }
}
export default Authentication;