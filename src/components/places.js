import React, {Component} from 'react';

class Places extends Component {
  constructor() {
    super();
    this.state ={
      searchVenues: '',
      locals: ''
    }
    this.searchVenues = this.searchVenues.bind(this);
    this.updateLocals = this.updateLocals.bind(this);
  }


  // TODO: create a add event listener for the locations
  // TODO: create the search function
  searchVenues() {
    console.log('searchVenues: ' +this.state.locals)
  }

  updateLocals(event) {
    this.setState({ locals: event.target.value })
    console.log('locals: '+event.target.value)
  }

  render(){
    //create the array that holds the list with the locations
    const list = this.props.venues.map((venue, i) => {
      return(
        <li key={i} aria-label="results locations">{venue.name}</li>
      )
    })
    return (
      <div>
        <input tabIndex="0" aria-label="search by locations" placeholder="search by..." role="button" type="text" onChange={this.updateLocals}/>
        <button className="button_search" onClick={this.searchVenues}>OK</button>
        <ul aria-label="list with locations">
          {list}
        </ul>
      </div>
    )
  }
}
export default Places;
