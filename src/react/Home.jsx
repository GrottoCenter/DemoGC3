import React, {Component} from 'react';
import {Jumbotron, ButtonGroup, Button} from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import APP_STATE from './Data.jsx';

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
        Authorization: '123456789'
      }
    };
    fetch('http://localhost:1337/api/entry/publicCount', init).then((response) => {
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
        <h2>Bienvenue sur la plus grande base de données mondiale de speleo-entomologie</h2>
        <hr />
        <p>It contains {APP_STATE.database.entries.length} references</p>
        <p><small>Caving data powered by Grottocenter ({this.state.gcEntries} entries referenced on Grottocenter)</small></p>
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