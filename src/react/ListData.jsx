import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Jumbotron, Grid, Row, Col, Table, Button} from 'react-bootstrap';
import APP_STATE from './Data.jsx';

class ListData extends Component {
  constructor(props){
    super(props);
  }

  handleRemove(removedEntry) {
    let newDb = [];
    APP_STATE.database.entries.map((entry, index) => {
      if (entry.id !== removedEntry.id) {
        newDb.push(entry);
      }
    });
    APP_STATE.database.entries = newDb;
    this.props.history.push('/app/list');
  }

  render() {
    let data = [];
    APP_STATE.database.entries.map((entry, index) => (
      data.push(<tr key={entry.id}>
        <td>{entry.id}</td>
        <td>{entry.title}</td>
        <td>{entry.gc_entry_ref}</td>
        <td>{entry.gc_entry_ref}</td>
        <td>{entry.taxonomy.name}</td>
        <td>{entry.sample_bottle}</td>
        <td>
          <Button bsStyle="primary" onClick={() => (this.props.history.push('/app/entry/view/' + entry.id))}>View</Button>
          <Button bsStyle="danger" onClick={() => this.handleRemove(entry)}>Remove</Button>
        </td>
      </tr>)
    ));

    return (
      <Jumbotron>
        <h2>Database content</h2>
        <hr />
        <Table responsive>
          <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Entry name</th>
            <th>Entry county</th>
            <th>Bug species</th>
            <th>Sample bottle</th>
            <th/>
          </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </Table>
        <Button bsStyle="primary"><Link to='/app/entry/add'>Add a new reference</Link></Button>
      </Jumbotron>
    );
  }
}

export default ListData;