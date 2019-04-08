// TODO: refactor using vanilla leaflet like in https://github.com/clhenrick/React-Leaflet-demo/blob/master/src/Map.js
// so that we don't get missing icon problems

import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server'; // missing icon workaround
import { divIcon } from 'leaflet';  // missing icon workaround
import { getIsochrones, getLocation } from '../services/Mapping';
import 'leaflet/dist/leaflet.css';
import './LocalMap.css';

class LocalMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      maxTravelIsochrone: [],
      center: [0, 0],
    }
  }

  async componentDidUpdate(prevProps) {
    try {
      // TODO: Figure out if we can update isochrone and jobs markers independently
      if (
        this.props.jobs === prevProps.jobs
        && this.props.startingLocation === prevProps.startingLocation
      ) {
        return;
      }

      var isochrones = await getIsochrones(this.props.startingLocation);
      var locationDetails = await getLocation(this.props.startingLocation);

      this.setState({
        center: locationDetails.point.coordinates,
        maxTravelIsochrone: isochrones
      });
    }
    catch(err) {
      console.log(JSON.stringify(err));
    }
  }

  render() {
    // missing icon workaround
    const iconMarkup = renderToStaticMarkup(<i className=" fa fa-map-marker-alt fa-3x" />); 
    const customMarkerIcon = divIcon({
      html: iconMarkup,
    });  // missing icon workaround

    return (
      <div className="LocalMap">
        <Map center={this.state.center} zoom={11}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />

          {this.props.jobs.map(
            function(job, index){
              return(
                <Marker key={index} position={[job.latitude, job.longitude]} icon={customMarkerIcon}>
                  <Popup>
                    {job.company} - {job.jobtitle}<br /><br />
                    Posted - {job.formattedRelativeTime}<br /><br />
                    {job.snippet}<br /><br />
                    <a href={job.url}>Job link</a>
                  </Popup>
                </Marker>
              );
            }
          )}

          <Polygon positions={this.state.maxTravelIsochrone} color="blue" weight="1"></Polygon>
        </Map>
      </div>
    )
  }
}

export default LocalMap;