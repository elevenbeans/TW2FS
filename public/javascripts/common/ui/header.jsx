
//import {Component} from 'react';
//import $ from 'zepto';
import { Link, IndexLink} from 'react-router';

const Header = () => (
  <div>
    <h1>APP Header!</h1>
		<Link to="/flight" >Flight</Link>&nbsp;
		<Link to="/hotel" >Hotel</Link>&nbsp;
		<Link to="/train" >Train</Link>
  </div>
)

export default Header;