import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Jumbotron, Grid, Row, Col, Table, Button} from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import APP_STATE from './Data.jsx';
import styled from 'styled-components';

const FromGC = styled.span`
  background-color: yellow;
`;

class ListDataItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      gcEntry: undefined
    }
  }

  componentDidMount() {
    let init = {
      headers : {
        Accept: 'application/json',
        Authorization: APP_STATE.key
      }
    };
    fetch(APP_STATE.url + '/api/v1/entry/' + encodeURIComponent(this.props.entry.gc_entry_ref), init).then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
      .then((entry) => {
        this.setState({
          gcEntryName: entry.name,
          gcEntryCity: entry.city,
          gcEntryRegion: entry.region,
        });
      });
  }

  render() {
    return (
      <tr>
        <td>{this.props.entry.id}</td>
        <td>{this.props.entry.title}</td>
        <td><FromGC>{(this.state.gcEntryName) ? this.state.gcEntryName : ''}</FromGC></td>
        <td><FromGC>{(this.state.gcEntryName) ? this.state.gcEntryCity + ' - ' + this.state.gcEntryRegion : ''}</FromGC></td>
        <td>{this.props.entry.taxonomy.name}</td>
        <td>{this.props.entry.sample_bottle}</td>
        <td>
          <Button bsStyle="primary" onClick={() => (this.props.onClickView(this.props.entry.id))}>View</Button>
          <Button bsStyle="danger" onClick={() => this.handleRemove(this.props.entry)}>Remove</Button>
        </td>
      </tr>
    );
  }
}

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
    APP_STATE.database.entries.map((entry, index) => {
      data.push(<ListDataItem key={entry.id}
                              entry={entry}
                              onClickView={(id) => this.props.history.push('/app/entry/view/' + id)}/>);
    });

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
            <th>Entry location</th>
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