import React, { Component } from 'react';

class Places extends Component {
  //constructor
  constructor() {
    super();
    this.state ={
      locals: ''
    }
    this.updateLocals = this.updateLocals.bind(this);
  }

  //create a function for update locals
  updateLocals(event){
    this.setState({
      locals: event.target.value
    });
  }


  render(){
    //create a new variable to assign the filter for search the list locations
    let filterVenues = this.props.venues.filter(
      (venue) => {
        return venue.name.toLowerCase().indexOf(this.state.locals) >= 0;
      }
    );
    //create the array that holds the list with the locations
    const list = filterVenues.map((venue, i, handleClick) => {
      return(
        <li key={i} aria-label="results locations" tabIndex="0" onClick={() => this.props.handleClick(venue)}>{venue.name}</li>
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

