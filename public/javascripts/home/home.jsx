
import {Component} from 'react';
import { Link, IndexLink} from 'react-router';
import $ from 'zepto';

class Home extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return(<div>
			    	Home page ~
      			<div>
      				<Link to="/flight" >go to flight</Link><br />
      				<Link to="/hotel" >go to hotel</Link><br />
      				<Link to="/train" >go to train</Link>
      			</div>
					</div>
					);
	}
}

export default Home;