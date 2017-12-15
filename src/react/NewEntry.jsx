import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Jumbotron, Grid, Row, Col, ButtonGroup, Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import Autosuggest, {ItemAdapter} from 'react-bootstrap-autosuggest';
import styled from 'styled-components';
import APP_STATE from './Data.jsx';

const Italic = styled.span`
  font-style: italic;
  color: blue;
`;

const FromGC = styled.span`
  background-color: yellow;
`;

class EntryAdapter extends ItemAdapter {
  itemIncludedByInput() {
    return true;
  }
  sortItems(items) {
    return items;
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
EntryAdapter.instance = new EntryAdapter();

class NewEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      reposMessage: '',
      reposMore: null,
      title: '',
      name: '',
      entry: undefined,
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
    if (this.state.entry && this.state.entry.id > 0) {
      let newEntry = {
        id: this.getMaxIdOnDb(),
        title: this.state.title,
        description: '',
        gc_entry_ref: this.state.entry.id,
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

  onRepoSearch(search, page, prev) { // $fold-line$
    if (search && search.length >= 3) {
      this.setState({
        reposMessage: 'Searching for matching repositories...',
        reposMore: null
      });
      let url = APP_STATE.url + '/api/v1/search/findAll?name=' +
        encodeURIComponent(search);
      if (page) {
        url += '&page=' + page
      }
      let init = {
        headers: {
          Accept: 'application/json',
          Authorization: APP_STATE.key
        }
      };
      fetch(url, init).then(response => {
        if (response.ok) {
          response.json().then(json => {
            let repos, reposMessage, reposMore;
            if (json.entries.length === 0) {
              reposMessage = 'No matching repositories';
            } else {
              repos = prev ? prev.concat(json.entries) : json.entries;
              if (repos.length < json.entries.length) {
                reposMessage = 'Load more...';
                reposMore = () => onRepoSearch(search, page ? page + 1 : 2, repos);
              }
            }
            this.setState({
              repos,
              reposMessage,
              reposMore
            })
          })
        } else {
          this.setState({
            repos: null,
            reposMessage: 'Repository search returned error: ' + response.statusText,
            reposMore: null
          })
        }
      }, err => {
        this.setState({
          repos: null,
          reposMessage: 'Repository search failed: ' + err.message,
          reposMore: null
        })
      })
    } else {
      this.setState({
        repos: null,
        reposMessage: 'Type at least 3 characters to get suggestions',
        reposMore: null
      })
    }
  }

  onRepoChange(value) {
    this.setState({ repo: value })
  }

  onSelect(value) {
    this.setState({ entry: value })
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
              <FromGC>Location</FromGC>
            </Col>
            <Col sm={8}>
              <Autosuggest
                datalist={this.state.repos}
                datalistPartial
                datalistMessage={this.state.reposMessage}
                onDatalistMessageSelect={this.state.reposMore}
                placeholder="Select an entry"
                value={this.state.repo}
                itemAdapter={EntryAdapter.instance}
                itemValuePropName="name"
                searchDebounce={500}
                onSearch={(...args) => this.onRepoSearch(...args)}
                onChange={(...args) => this.onRepoChange(...args)}
                onSelect={(...args) => this.onSelect(...args)} />
            </Col>
          </FormGroup>

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