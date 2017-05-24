import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardCellContainer from './BoardCell';
import '../styles/BoardRow.css';

class BoardRow extends Component {
	constructor(props){
		super(props);
	}

	render() {
		var self = this;
		return (
			<div className="BoardRow">
				{this.props.row.map(function(val, colId){
					var style = {};
					if(val == "_"){
						style = {
							backgroundColor: "lightGreen",
							color: "lightGreen"
						};
					}					
					return <BoardCellContainer key={[self.props.rowId, colId]} cellValue={val} rowId={self.props.rowId} colId={colId} style={style} won={self.props.won}/>
				})}
			</div>		
		)
	}
}

BoardRow.propTypes = {
	row: PropTypes.array.isRequired,
	rowId: PropTypes.number.isRequired,
	won: PropTypes.bool.isRequired
};

export default BoardRow;
