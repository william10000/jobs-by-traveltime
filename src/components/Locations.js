import React, { Component } from 'react';
import {
  Table,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
  Spinner
 } from 'reactstrap';

class Locations extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidUpdate(prevProps) {
    try {
      if (this.props.jobs === prevProps.jobs) {
        return;
      }

      if (!Array.isArray(this.props.jobs) || !this.props.jobs.length) {
        console.log('jobs is either not an array or empty' + JSON.stringify(this.props.jobs));
      }
    }
    catch(err) {
      console.log(JSON.stringify(err));
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div><Spinner color="primary" /></div>
      );
    }
    return (
      <div className="Locations">
        <Table className="span6">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
          {this.props.jobs.map(
            function(job, index){
              return(
                <tr id={`PopoverTarget${index}`}>
                  <td>{job.company}</td>
                  <td>{job.jobtitle}</td>
                  <td>{job.formattedLocationFull}</td>
                  <UncontrolledPopover trigger="legacy" placement="bottom" target={`PopoverTarget${index}`}>
                    <PopoverHeader>{job.jobtitle}</PopoverHeader>
                    <PopoverBody>
                      {`Posted - ${job.formattedRelativeTime}`}<br /><br />
                      {job.snippet}<br /><br />
                      <a href={job.url}>Job link</a>
                    </PopoverBody>
                  </UncontrolledPopover>
                </tr>
              );
            }
          )}
        </tbody>
        </Table>
      </div>
    );
  }
}

export default Locations;