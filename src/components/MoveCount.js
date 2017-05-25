import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import '../styles/MoveCount.css';
class MoveCount extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="MoveCount">
				<Col lg={6}>
					Moves: 
				</Col>
				<Col lg={6} className="count">
					{this.props.count}
				</Col>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		count: state.moves.length
	};
}

function mapDispatchToProps(dispatch){
	return {
	};
}

const MoveCountComponent = connect(mapStateToProps, mapDispatchToProps)(MoveCount);

export default MoveCountComponent;