import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Jumbotron, Grid, Row, Col, ButtonGroup, Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import Autosuggest, {ItemAdapter} from 'react-bootstrap-autosuggest';
import styled from 'styled-components';
import APP_STATE from './Data.jsx';

const baseSelect = {
  name: 'Please type at least 3 characters',
  id: 0
};

const Italic = styled.span`
  font-style: italic;
  color: blue;
`;

class StateAdapter extends ItemAdapter {
  getTextRepresentations(item) {
    return item.name;
  }

  renderItem(item) {
    let details = '';
    if (item.city) {
      details += item.city;
    }
    if (item.region) {
      details += ((details.length > 0) ? ' - ' : '') + item.region;
    }
    if (item.country) {
      details += ((details.length > 0) ? ' - ' : '') + item.country;
    }
    if (details.length > 0) {
      details = <Italic>({details})</Italic>;
    }
    return (
      <div>
        {item.name} {details}
      </div>
    );
  }
}
StateAdapter.instance = new StateAdapter();

class NewEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasource: [baseSelect],
      title: '',
      name: '',
      entry: '',
      specie: '',
      genus: '',
      family: '',
      order: '',
      sample: ''
    };
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

  handleValidate() {
    if (document.getElementById('formHorizontalEntryId').value > 0) {
      let newEntry = {
        id: this.getMaxIdOnDb(),
        title: this.state.title,
        description: '',
        gc_entry_ref: document.getElementById('formHorizontalEntryId').value,
        taxonomy: {
          name: this.state.name,
          species: this.state.specie,
          genus: this.state.genus,
          family: this.state.family,
          order: this.state.order
        },
        sample_bottle: this.state.sample
      };
      APP_STATE.database.entries.push(newEntry);

      this.props.history.push('/app/home');
    }
  }

  searchSuggests() {
    let searchText = document.getElementById('formHorizontalEntry').value;
    if (searchText && searchText.length >= 3) {
      let init = {
        headers: {
          Accept: 'application/json',
          Authorization: '123456789'
        }
      };
      let criteria = 'name=' + encodeURIComponent(searchText);
      fetch('http://localhost:1337/api/search/findAll?' + criteria, init).then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((results) => {
        this.setState({
          datasource: results
        });
      });
    } else {
      this.setState({
        datasource: [baseSelect]
      });
    }
  }

  selectEntry(item) {
    if (item && item.id > 0) {
      document.getElementById('formHorizontalEntryId').value = item.id;
    }
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
              <FormControl
                value={this.state.title}
                onChange={(event) => this.setState({ title: event.target.value })}
                type="text"
                placeholder="Title" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEntry">
            <Col componentClass={ControlLabel} sm={4}>
              Entry (from Grottocenter)
            </Col>
            <Col sm={8}>
              <Autosuggest
                placeholder="Choose an entry"
                itemAdapter={StateAdapter.instance}
                onChange={() => this.searchSuggests()}
                onSelect={(item) => this.selectEntry(item)}
                itemReactKeyPropName='id'
                itemValuePropName='name'
                value={this.state.entry}
                datalist={this.state.datasource}/>
            </Col>
          </FormGroup>

          <input type='hidden' id='formHorizontalEntryId' />

          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={4}>
              Bug name
            </Col>
            <Col sm={8}>
              <FormControl
                value={this.state.name}
                onChange={(event) => this.setState({ name: event.target.value })}
                type="text"
                placeholder="Bug name" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalSpecie">
            <Col componentClass={ControlLabel} sm={4}>
              Bug specie
            </Col>
            <Col sm={8}>
              <FormControl
                value={this.state.specie}
                onChange={(event) => this.setState({ specie: event.target.value })}
                type="text"
                placeholder="Bug specie" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalGenus">
            <Col componentClass={ControlLabel} sm={4}>
              Bug genus
            </Col>
            <Col sm={8}>
              <FormControl
                value={this.state.genus}
                onChange={(event) => this.setState({ genus: event.target.value })}
                type="text"
                placeholder="Bug genus" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalFamily">
            <Col componentClass={ControlLabel} sm={4}>
              Bug family
            </Col>
            <Col sm={8}>
              <FormControl
                value={this.state.family}
                onChange={(event) => this.setState({ family: event.target.value })}
                type="text"
                placeholder="Bug family" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalOrder">
            <Col componentClass={ControlLabel} sm={4}>
              Bug order
            </Col>
            <Col sm={8}>
              <FormControl
                value={this.state.order}
                onChange={(event) => this.setState({ order: event.target.value })}
                type="text"
                placeholder="Bug order" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalSample">
            <Col componentClass={ControlLabel} sm={4}>
              Sample bottle identifier
            </Col>
            <Col sm={8}>
              <FormControl
                value={this.state.sample}
                onChange={(event) => this.setState({ sample: event.target.value })}
                type="text"
                placeholder="Sample bottle identifier" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="danger" onClick={() => (this.props.history.push('/app/home'))}>Cancel</Button>
              <Button bsStyle="primary" onClick={() => this.handleValidate()}>Validate</Button>
            </Col>
          </FormGroup>
        </Form>
      </Jumbotron>
    );
  }
}

export default NewEntry;