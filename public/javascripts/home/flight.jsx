import {Component} from 'react';
import { Link, IndexLink} from 'react-router';

class Flight extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="flight-main"><h2>This is Flight page~</h2><br />
      	<div>
      		<Link to="flight/shanghai-to-beijing">go search</Link><br />
      		<a href="http://localhost:3000/">go back home</a>
      	</div>
			</div>
		)
	}
}

export default Flight;