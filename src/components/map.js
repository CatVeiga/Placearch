import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

class MapContainer extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.state ={
      venue: [],
      hasError: false,
      infoMarker: {},
      isOpen: false
    }
  }

  //create the click handle for the infoWindow 
  handleClick = venue => {
    //create a condition to open an infowindow
    if(venue === this.state.infoMarker) {
      this.setState ({
        infoMarker: venue,
        isOpen: !this.state.isOpen
      });
    } else {
      this.setState({ infoMarker: venue });
    }
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
      return <Marker key={i} icon={icon} animation={window.google.maps.Animation.DROP} onClick={() => this.handleClick(venue)} {...marker}>
              {this.state.infoMarker.id === venue.id &&
                (this.state.isOpen && ( 
                  <InfoWindow onCloseClick={() => this.handleClick(venue)}>
                  <div className="infobox">
                    <h3>{venue.name}</h3>
                  </div>  
                </InfoWindow>))}
            </Marker>
    });  

    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={this.props.center}>
        {marker}
        {this.props.children}
      </GoogleMap>
    );
  }
}
export default withGoogleMap(MapContainer);
