import React, {Component} from 'react';
import {Jumbotron, ButtonGroup, Button} from 'react-bootstrap';

import APP_STATE from './Data.jsx';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Jumbotron>
        <h2>Bienvenue sur la plus grande base de données mondiale de speleo-entomologie</h2>
        <hr />
        <p>It contains {APP_STATE.database.entries.length} references</p>
        <p><small>Caving data powered by Grottocenter (XXXXXX entries referenced on Grottocenter)</small></p>
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