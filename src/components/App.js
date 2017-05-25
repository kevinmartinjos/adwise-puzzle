import React, { Component } from 'react';
import {Row, Col, Jumbotron, Grid} from 'react-bootstrap';
import TimerContainer from './TimerContainer';
import PuzzleContainer from './PuzzleContainer';
import MovesContainer from './MovesContainer';
import NewgameButtonContainer from './NewgameButtonContainer';
import MoveCount from './MoveCount';
import '../styles/App.css';

class App extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
		<Grid>
			<Row>
				<Jumbotron className="title">
					Adwyze Puzzle
				</Jumbotron>
			</Row>
			<Row>
				<Col xs={12} sm={3} md={3} lg={3} className="leftPanel">
					<TimerContainer />
					<MoveCount />
					<NewgameButtonContainer />
				</Col>
				<Col xs={12} sm={6} md={6} lg={6}>
					<PuzzleContainer />
				</Col>
				<Col xs={12} sm={3} md={3} lg={3}>
					<MovesContainer />
				</Col>
			</Row>
		</Grid>
		)
	}
}

// export default connect(mapStateToProps)(App);
export default App;
