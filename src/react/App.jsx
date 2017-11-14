import React, {Component} from 'react';
import {Navbar, Nav, NavItem, Grid, Row, Col} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';

export const MainAppGrid = styled(Grid)`
  margin: 10px;
  width: 100%;
  
  a, a:visited, a:hover {
    text-decoration: none;
    color: #909090;
    font-weight: bold;
   }
  
  button > a, button > a:visited, button > a:hover {
    color: white;
   }
`;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainAppGrid>
        <Row className="show-grid">
          <Col xs={8} xsOffset={2}>
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  DemoGC3
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
                <LinkContainer to="/app/home">
                  <NavItem eventKey={1}>Home</NavItem>
                </LinkContainer>
                <LinkContainer to="/app/list">
                  <NavItem eventKey={2}>Database</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar>
          </Col>
          <Col xs={8} xsOffset={2}>
            {this.props.children}
          </Col>
        </Row>
      </MainAppGrid>
    );
  }
}

export default App;