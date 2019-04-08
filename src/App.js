import React, { Component } from 'react';
import LocalMap from './components/LocalMap';
import Locations from './components/Locations';
import SearchForm from './components/SearchForm';
import { getJobs } from './services/Jobs';
import { Container, Row, Col } from 'reactstrap';
import './App.css';  

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.state = {
      searchTerms: '',
      startingLocation: {},
      jobs: []
    }
  }

  async handleSearchFormSubmit(searchTerms, startingLocation) {
    // TODO: don't fetch jobs if neither earchTerms, startingLocation changed
    this.setState({
      loading: true
    })
    var jobs = await getJobs(searchTerms, startingLocation);

    this.setState({
      loading: false,
      searchTerms: searchTerms,
      startingLocation: startingLocation,
      jobs: jobs
    });
  }

  render() {
    // const searchTerms = this.state.searchTerms;
    const jobs = this.state.jobs;
    const loading = this.state.loading;
    return (
      <Container fluid>
        <Row>
          <Col>
            <SearchForm
              handleSearchFormSubmit={this.handleSearchFormSubmit}
            />
            <Locations jobs={jobs} loading={loading}/>
          </Col>
          <Col>
            <LocalMap jobs={jobs} startingLocation={this.state.startingLocation}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;
