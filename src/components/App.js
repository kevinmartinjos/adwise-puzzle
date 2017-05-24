import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import TimerContainer from './TimerContainer';
import PuzzleContainer from './PuzzleContainer';
import MovesContainer from './MovesContainer';

class App extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<Row>
				<Col xs={3} lg={3}>
					<TimerContainer />
				</Col>
				<Col xs={3} lg={9}>
					<PuzzleContainer />
				</Col>
				<Col xs={3} lg={3}>
					<MovesContainer />
				</Col>
			</Row>
		
		)
	}
}

// export default connect(mapStateToProps)(App);
export default App;
