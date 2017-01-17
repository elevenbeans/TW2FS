import React from 'react';
import { Component } from 'react';
// import { IndexLink } from 'react-router';

class Hotel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="hotel-main"><h2>This is Hotel page ~</h2> <br />
        <div>
          <a href="http://localhost:3000/">go back home</a>
        </div>
      </div>
    );
  }
}

export default Hotel;
