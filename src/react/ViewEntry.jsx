import React, {Component} from 'react';
import {Jumbotron, ButtonGroup, Button, Grid, Row, Col} from 'react-bootstrap';
import RefMap from './Map.jsx';
import APP_STATE from './Data.jsx';

const Details = ({reference}) => (
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
      <Col xs={6}>
        <RefMap position={[51.505, -0.09]} text={reference.title}/>
      </Col>
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
      reference: reference
    };
  }

  render() {
    let content = (this.state.reference) ? <Details reference={this.state.reference}/> : <p>Unknown reference!</p>;
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