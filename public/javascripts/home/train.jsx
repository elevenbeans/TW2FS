import {Component} from 'react';
import { Link, IndexLink} from 'react-router';


class Train extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>This is train page ~
				<div><Link to="/">go back home</Link></div>
			</div>
		)
	}
}

export default Train;