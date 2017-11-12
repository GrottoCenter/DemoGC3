import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Jumbotron, Grid, Row, Col, ButtonGroup, Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import APP_STATE from './Data.jsx';

class NewEntry extends Component {
  constructor(props) {
    super(props);
  }

  getMaxIdOnDb() {
    let max = 0;
    APP_STATE.database.entries.map((entry) => {
      if (entry.id > max) {
        max = entry.id;
      }
    });
    return max + 1;
  }

  handleValidate(data) {
    let newEntry = {
      id: this.getMaxIdOnDb(),
      title: document.getElementById('formHorizontalTitle').value,
      description: '',
      gc_entry_ref: document.getElementById('formHorizontalEntry').value,
      taxonomy: {
        name: document.getElementById('formHorizontalName').value,
        species: document.getElementById('formHorizontalSpecie').value,
        genus: document.getElementById('formHorizontalGenus').value,
        family: document.getElementById('formHorizontalFamily').value,
        order: document.getElementById('formHorizontalOrder').value
      },
      sample_bottle: document.getElementById('formHorizontalSample').value
    };
    APP_STATE.database.entries.push(newEntry);

    this.props.history.push('/app/home');
  }

  render() {
    return (
      <Jumbotron>
        <h2>Add a new reference on database</h2>
        <hr />

        <Form horizontal>
          <FormGroup controlId="formHorizontalTitle">
            <Col componentClass={ControlLabel} sm={4}>
              Title
            </Col>
            <Col sm={8}>
              <FormControl type="text" placeholder="Title"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEntry">
            <Col componentClass={ControlLabel} sm={4}>
              Entry
            </Col>
            <Col sm={8}>
              <FormControl type="text" placeholder="Entry"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={4}>
              Bug name
            </Col>
            <Col sm={8}>
              <FormControl type="password" placeholder="Bug name"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalSpecie">
            <Col componentClass={ControlLabel} sm={4}>
              Bug specie
            </Col>
            <Col sm={8}>
              <FormControl type="password" placeholder="Bug specie"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalGenus">
            <Col componentClass={ControlLabel} sm={4}>
              Bug genus
            </Col>
            <Col sm={8}>
              <FormControl type="password" placeholder="Bug genus"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalFamily">
            <Col componentClass={ControlLabel} sm={4}>
              Bug family
            </Col>
            <Col sm={8}>
              <FormControl type="password" placeholder="Bug family"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalOrder">
            <Col componentClass={ControlLabel} sm={4}>
              Bug order
            </Col>
            <Col sm={8}>
              <FormControl type="password" placeholder="Bug order"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalSample">
            <Col componentClass={ControlLabel} sm={4}>
              Sample bottle identifier
            </Col>
            <Col sm={8}>
              <FormControl type="password" placeholder="Sample bottle identifier"/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="danger" onClick={() => (this.props.history.push('/app/home'))}>Cancel</Button>
              <Button bsStyle="primary" onClick={(data) => this.handleValidate(data)}>Validate</Button>
            </Col>
          </FormGroup>
        </Form>
      </Jumbotron>
    );
  }
}

export default NewEntry;