import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/map';
import Places from './components/places';
import superagent from 'superagent';

class App extends Component {
  //constructor
  constructor(){
    super();
    this.state={
      venues: []
    }
  }

  //component that will mounted with the fetch url from the foursquare API
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
  })
}

  render() {
    //my choosen location to start with, all my markers, are going to shown around this location
    const location = {
      lat: 38.736946,
      lng: -9.142685
    }

    return (
      <div className="App">
        <header className="header_section">
          <h1>Placearch</h1>
        </header>
        <div className="places">
          <Places venues={this.state.venues}
                  handleClick={this.handleClick} />
        </div>
        <div className="map_section">
          <MapContainer
              containerElement={<div style={{ height: '100%' }}></div>}
              mapElement={<div style={{ height: '100%' }}></div>}
              center={location}
              markers={this.state.venues}
              handleClick={this.handleClick}/>
        </div>
        <footer>
          <p>This was made by Catarina Veiga</p>
        </footer>
      </div>
    );
  }
}

export default App;
