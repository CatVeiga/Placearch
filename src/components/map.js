import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class MapContainer extends Component {

  //TODO: create the info windows 
  
  render() {
    //create the array with markers
    const marker = this.props.markers.map((venue, i) => {
      // set the location similar to the foursquare points
      const marker = {
        position: {
          lat: venue.location.lat,
          lng: venue.location.lng
        }
      }
      //set the icon for the markers
      const icon = {
        url:'https://github.com/cveiga819/assets/blob/master/markers_1.png?raw=true'
      }
      return <Marker key={i} icon={icon} {...marker} />
    });  

    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={this.props.center}>
        {marker}
      </GoogleMap>
    );
  }
}
export default withGoogleMap(MapContainer);
