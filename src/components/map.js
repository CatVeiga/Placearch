import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

class MapContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state ={
      venue: [],
      hasError: false,
      isOpen: false
    }
  }

  //Adding the infoWindows open
  toggleInfoWindow = venue => {
    this.setState({ isOpen: !this.state.isOpen });
  } 

  //Catching Error with Component did Catch, tutorial followed by the React Documentation
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
  
  render() {
    //error handling
    if(this.state.hasError) {
      return(
        <div className="Error_box">
          <h1>Ops, we are sorry, but something went wrong</h1>
          <p>Please check your internet connection, and try again.</p>
        </div>
      )
    }
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
      return <Marker key={i} icon={icon} animation={window.google.maps.Animation.DROP} onClick={() => this.toggleInfoWindow(venue)} {...marker}>
              {this.state.isOpen && 
              <InfoWindow onCloseClick={() => this.toggleInfoWindow(venue)}>
                <h5>{venue.name}</h5>
              </InfoWindow>}
            </Marker>
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
