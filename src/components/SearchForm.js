import React, { Component } from 'react';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      searchTerms: '',
      startingLocationAddress: '',
      startingLocationZip: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    // need a way to get all fields on submit rather than setting
    // on change
    let startingLocation = {
      address: this.state.startingLocationAddress,
      zip: this.state.startingLocationZip
    }
    this.props.handleSearchFormSubmit(this.state.searchTerms, startingLocation);
  }

  handleChange = async (e) => {
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { id } = target;
    await this.setState({
      [ id ]: value,
    });
  }

  render() {
    const { searchTerms, startingLocationAddress, startingLocationZip } = this.state;
    return (
      <Form className="form" onSubmit={ (e) => this.handleSubmit(e) }>
        <FormGroup row>
          <Label for="searchTerms" sm={3}>Job keywords</Label>
          <Col sm={8}>
           <Input
              type="text"
              id="searchTerms"
              placeholder="Enter keywords here"
              value={ searchTerms }
              onChange={ (e) => { this.handleChange(e) }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="startingLocation" sm={3}>Starting Location</Label>
          <Col sm={5}>
            <Input
              type="text"
              id="startingLocationAddress"
              placeholder="Enter street address or city, state"
              value={ startingLocationAddress }
              onChange={ (e) => { this.handleChange(e) }}
            />
          </Col>
          <Col sm={3}>
            <Input
              type="text"
              id="startingLocationZip"
              placeholder="Zip code"
              value={ startingLocationZip }
              onChange={ (e) => { this.handleChange(e) }}
            />
          </Col>
        </FormGroup>
        <Button type="submit">Update Results</Button>
      </Form>
    );
  }
}

export default SearchForm;
