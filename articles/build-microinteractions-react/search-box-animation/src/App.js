import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import SearchBox from './SearchBox'
import makeExpanding from './expanding-animation'
import makeMoveUp from './move-up-animation'
import makeSpringUp from './spring-up-animation'
import makeAnimatedValidatedSearchBox from './search-box-controller'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const ExpandingSearchBox = makeExpanding(SearchBox)
const MoveUpSearchBox = makeMoveUp(SearchBox)
const SpringUpSearchBox = makeSpringUp(SearchBox)
const ShakeSearchBox = makeSpringUp(SearchBox)

const AnimatedSearchBox = makeAnimatedValidatedSearchBox(SearchBox)

class App extends Component {
  render() {
    const style = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
    return (
      <MuiThemeProvider>
        <div style={style}>
          <AnimatedSearchBox />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
