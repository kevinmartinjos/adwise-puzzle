import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Col} from 'react-bootstrap';
import {startNewGame} from '../state/actions';
import '../styles/NewgameButtonContainer.css';

class NewgameButton extends Component {
	constructor(props){
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(){
		this.props.newGame();
	}

	render(){
		return (
			<div className="NewgameButtonContainer">
				<Col lg={12}>
					<Button onClick={this.onClick}> New game </Button>
				</Col>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {

	};
}

function mapDispatchToProps(dispatch){
	return {
		newGame: function(){
			dispatch(startNewGame());
		}
	}
}

const NewgameButtonContainer = connect(mapStateToProps, mapDispatchToProps)(NewgameButton);

export default NewgameButtonContainer;