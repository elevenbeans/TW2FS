import {Component} from 'react';
import { Link, IndexLink} from 'react-router';


class Train extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className='train-main'><h2>This is train page ~</h2><br />
				<div>
      		<a href="http://localhost:3000/">go back home</a>
				</div>
			</div>
		)
	}
}

export default Train;