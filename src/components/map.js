import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class MapContainer extends Component {
  render() {
    //create the array with markers(empty)
    const markers = this.props.markers || [];

    //create the style for the markers
    const icon = {
      url:'https://github.com/cveiga819/assets/blob/master/markers.png?raw=true'
    }

    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={this.props.center}>
        {markers.map((marker, i) => (
            <Marker icon={icon} key={i} {...marker}  />
          )
        )}
      </GoogleMap>
    );
  }
}
export default withGoogleMap(MapContainer);
