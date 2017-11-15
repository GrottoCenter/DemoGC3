import React, {Component} from 'react';
import {Jumbotron, ButtonGroup, Button, Grid, Row, Col} from 'react-bootstrap';
import RefMap from './Map.jsx';
import APP_STATE from './Data.jsx';

const Details = ({reference, entry}) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <div><label>Reference title:</label>  {reference.title}</div>
        <div><label>Description:</label>  {reference.description}</div>
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
        <div><label>Archived on bottle:</label> {reference.sample_bottle}</div>
        <br/>
        <p>Taxonomy</p>
        <div><label>Name:</label> {reference.taxonomy.name}</div>
        <div><label>Species:</label> {reference.taxonomy.species}</div>
        <div><label>Genus:</label> {reference.taxonomy.genus}</div>
        <div><label>Family:</label> {reference.taxonomy.family}</div>
        <div><label>Order:</label> {reference.taxonomy.order}</div>
      </Col>
      {entry &&
      <Col xs={6}>
        <RefMap position={[entry.latitude, entry.longitude]} text={entry.name}/>
      </Col>}
    </Row>
  </Grid>
);

class ViewEntry extends Component {
  constructor(props) {
    super(props);
    let reference;
    APP_STATE.database.entries.map((entry, index) => {
      if (entry.id.toString() === this.props.match.params.refId) {
        reference = entry;
      }
    });
    this.state = {
      reference: reference,
      entry: undefined
    };
  }

  componentDidMount() {
    let init = {
      headers : {
        Accept: 'application/json',
        Authorization: '123456789'
      }
    };
    fetch('http://beta.grottocenter.org:1337/api/entry/' + encodeURIComponent(this.state.reference.gc_entry_ref), init).then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
      .then((entry) => {
        this.setState({
          entry: entry
        });
      });
  }

  render() {
    let content = (this.state.reference) ? <Details reference={this.state.reference} entry={this.state.entry} /> : <p>Unknown reference!</p>;
    return (
      <Jumbotron>
        <h2>Reference details</h2>
        <hr />
        {content}
        <br/>
        <Button bsStyle="primary" onClick={() => (this.props.history.push('/app/list'))}>Back to list</Button>
      </Jumbotron>
    );
  }
}

export default ViewEntry;