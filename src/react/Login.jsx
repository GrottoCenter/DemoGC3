import React, {Component} from 'react';
import {Jumbotron, Form, FormGroup, Grid, Row, Col, Button, FormControl, ControlLabel} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {MainAppGrid} from './App.jsx';
import APP_STATE from './Data.jsx';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  handleLog(param) {
    APP_STATE.logged = true;
    this.props.history.push('/app/home');
  }

  render() {
    return (
      <MainAppGrid>
        <Row className="show-grid">
          <Col xs={8} xsOffset={2}>
            <Jumbotron>
              <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Identifier
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Identifier"/>
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password"/>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button onClick={() => (this.handleLog())}>
                      Sign in
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      </MainAppGrid>
    );
  }
}

export default Login;