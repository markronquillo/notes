import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Winner extends Component {
  constructor(props) {
      super(props);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  
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

