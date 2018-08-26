import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class MapContainer extends Component {
  //constructor
  constructor(props){
    super(props);
    this.state={
      hasError: false
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
    return(
      <GoogleMap
       defaultZoom={12}
       defaultCenter={{lat: 38.736946, lng: -9.142685}}>
       {this.props.children}
     </GoogleMap>
   );
  }
}
export default withGoogleMap(MapContainer);
