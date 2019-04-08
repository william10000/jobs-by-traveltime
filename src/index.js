import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('root'));

// TODO:
// change marker color when clicking on list
// add form to set the location
// move APIs to server side so we API keys can stay on server

// use context API to minimize API calls
// add function to filter out jobs outside of isochrone
// add tests
// add CI
// add CD to cloud