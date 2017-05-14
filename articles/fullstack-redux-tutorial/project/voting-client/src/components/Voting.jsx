import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Vote from './Vote';
import Winner from './Winner';

class Voting extends React.Component {
    constructor(props) {
        super(props);
        // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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

export default Voting;

