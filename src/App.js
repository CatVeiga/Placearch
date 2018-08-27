import React, { Component } from 'react';
import "./App.css";
import superagent from 'superagent';
import { InfoWindow, Marker } from 'react-google-maps';
import MapContainer from './components/map';
import Places from './components/places';

class App extends Component {
  //constructor
  constructor(props){
    super(props);
    this.state= {
      position: {
        lat: 38.736946,
        lng: -9.142685
      },
      venues: [],
      infoMarker: false,
      isOpen: false
    }
  }

  //component that will mounted with the fetch URL from the Foursquare API
  componentDidMount(){
    const URL = 'https://api.foursquare.com/v2/venues/search?ll=38.736946,-9.142685&categoryId=4bf58dd8d48988d181941735&client_id=TABJ4BUFKAHJALLDGB40C5DSUV5415NTGZTX03SKREKFV1CH&client_secret=YRWIN2J2FLL5TO0WDSHQJFXYSS5OWPWDNXACJA4O5ZU1OR34&v=20180816';
    //fetch the data through the superagent
    superagent
    .get(URL)
    .query(null)
    .set('Accept', 'text/json')
    .end((error, response) => {
      const venues = response.body.response.venues;
        this.setState({ venues: venues })
    });
  }

  //the click event for open the info windows and the places list with specific info window
  handleClick = venue => {
    this.setState({
      infoMarker: venue,
      isOpen: !this.state.isOpen
    });
  }

  // function that allowed the list of locations clickable issue #8
  markersShown = () => {
    //copy a value to target an object, for use Object.Assign (tutorial from MDN web docs)
    const venues = Object.assign({}, this.state.venues);
    let locationList = [];
      //maping and pushing the markers in the map 
      if(!!venues) {
        Object.values(venues).map((venue, i) => {
          //return the locationlist array and push to present the markers and info windows
          return locationList.push(
          //show the marker and info window "inside" the marker
          <Marker key={i} icon={'https://github.com/cveiga819/assets/blob/master/markers_1.png?raw=true'} position={{lat: venue.location.lat, lng: venue.location.lng}} animation={window.google.maps.Animation.DROP} onClick={() => this.handleClick(venue)}>
            {this.state.infoMarker.id === venue.id &&
              (this.state.isOpen && (
                <InfoWindow onCloseClick={() => this.handleClick(venue)}>
                  <div className="infobox">
                    <h3>{venue.name}</h3>
                    <p>{venue.categories[0].name}</p>
                    <p>{venue.location.formattedAddress}</p>
                  </div>
                </InfoWindow>))}
          </Marker>
        );
      });
    return locationList;
    }
  };

  render(){
    return(
      <div className="App">
        <header className="header_section">
          <h1>Placearch</h1>
        </header>
        <div className="places">
          <Places
            venues={this.state.venues}
            updateLocals={this.updateLocals}
            handleClick={this.handleClick}/>
        </div>
        <div className="map_section">
          <MapContainer
            containerElement={<div style={{ height: '100%' }}></div>}
            mapElement={<div style={{ height: '100%' }}></div>}
            center={this.state.position}
            >
            {this.markersShown()}
          </MapContainer>
        </div>
        <footer>
          <p>This was made by Catarina Veiga</p>
        </footer>
      </div>
    )
  }
}
export default App;
