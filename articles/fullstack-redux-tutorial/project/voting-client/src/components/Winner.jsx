import React, { Component } from 'react';

export default class Winner extends Component {
  render() {
    return (
    	<div>
	      <div className="winner">Winner is {this.props.winner}.</div>
	      
				<button ref="reset"
								className="reset"
								onClick={this.props.reset} >
								Reset
				</button>
			</div>
    );
  }
};

