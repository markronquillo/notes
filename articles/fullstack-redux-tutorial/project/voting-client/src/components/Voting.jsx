import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import Vote from './Vote';
import Winner from './Winner';
import * as actionCreators from '../action_creators';


export class Voting extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render = function() {
      return (
        <div>
          {this.props.winner ?
              <Winner winner={this.props.winner} /> :
              <Vote {...this.props}  />
          }
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  }
}

export default connect(mapStateToProps, actionCreators)(Voting);

