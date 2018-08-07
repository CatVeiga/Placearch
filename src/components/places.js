import React, {Component} from 'react';

class Places extends Component {
  constructor() {
    super();
    this.state ={
      locals: ''
    }
    this.updateLocals = this.updateLocals.bind(this);
  }


  // TODO: create a add event listener for the locations
  // TODO: create the search function
  updateLocals(event) {
    this.setState({ locals: event.target.value })
  }

  render(){
    //create a new variable for the filter locations
    let filterVenues = this.props.venues.filter(
      (venue) => {
        return venue.name.indexOf(this.state.locals) >=0;
      }
    )
    //create the array that holds the list with the locations
    const list = this.props.venues.map((venue, i) => {
      return(
        <li key={i} aria-label="results locations">{venue.name}</li>
      )
    })
    return (
      <div>
        <input tabIndex="0" aria-label="search by locations" placeholder="search by..." role="button" type="text" onChange={this.updateLocals}
          value={this.state.locals}/>
        <ul aria-label="list with locations">
          {list}
        </ul>
      </div>
    )
  }
}
export default Places;
