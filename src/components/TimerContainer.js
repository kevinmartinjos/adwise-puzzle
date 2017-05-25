import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addTime} from '../state/actions';
import {Row, Col} from 'react-bootstrap';
import '../styles/TimerContainer.css';

class Timer extends Component {
	constructor(props){
		super(props);
	}

	formatSeconds(time){
		var hours = Math.floor(time/3600);
		var minutes = Math.floor((time%3600)/60);
		var seconds = (time%3600)%60;

		if(hours < 10){
			hours = "0" + hours;
		}

		if(minutes < 10){
			minutes = "0" + minutes;
		}

		if(seconds < 10){
			seconds = "0" + seconds;
		}
		return {
			hours, minutes, seconds
		};
	}

	componentDidMount(){
		var self = this;
		setInterval(function(){
			if(!self.props.hasWon && self.props.initialized){
				self.props.incrementTime();
			}
		}, 1000);
	}

	render() {
		var time = this.formatSeconds(this.props.timeElapsed);
		return (
			<div className="TimerContainer">
				<Col lg={6}>
					<div className="TimerHeader">
						Time:
					</div>
				</Col>
				<Col lg={6}>
					<div className="Timer">
						{time.hours}:{time.minutes}:{time.seconds}
					</div>
				</Col>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		timeElapsed: state.timeElapsed,
		hasWon: state.hasWon,
		initialized: state.initialized
	};
}

function mapDispatchToProps(dispatch){
	return {
		incrementTime: function(){
			dispatch(addTime());
		}
	};
}

const TimerContainer = connect(mapStateToProps, mapDispatchToProps)(Timer);
export default TimerContainer;
