import {Component} from 'react';
import { Link, IndexLink} from 'react-router';


class Hotel extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>This is Hotel page ~ 
				<div><Link to="/">go back home</Link></div>
			</div>
		)
	}
}

export default Hotel;