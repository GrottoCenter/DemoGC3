import React, {Component} from 'react';
import {Jumbotron, ButtonGroup, Button} from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import APP_STATE from './Data.jsx';
import styled from 'styled-components';

const FromGC = styled.span`
  background-color: yellow;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gcEntries: 0
    }
  }

  componentDidMount() {
    let init = {
      headers : {
        Accept: 'application/json',
        Authorization: APP_STATE.key
      }
    };
    fetch(APP_STATE.url + '/api/v1/entry/publicCount', init).then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((count) => {
      this.setState({
        gcEntries: count.count
      });
    });
  }

  render() {
    return (
      <Jumbotron>
        <h2>Welcome on the biggest worldwide database of speleo-entomology</h2>
        <hr />
        <p>It contains {APP_STATE.database.entries.length} references</p>
        <p><small>Caving data powered by Grottocenter (<FromGC>{this.state.gcEntries}</FromGC> entries referenced on Grottocenter)</small></p>
        <br/>
        <ButtonGroup bsSize="large">
          <Button bsStyle="primary" onClick={() => (this.props.history.push('/app/list'))}>View references</Button>
          <Button bsStyle="warning" onClick={() => (this.props.history.push('/app/entry/add'))}>Add a new reference</Button>
        </ButtonGroup>
      </Jumbotron>
    );
  }
}

export default Home;