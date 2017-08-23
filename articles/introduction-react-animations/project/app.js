import React from 'react'
import { render } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


class Home extends React.Component 
{
    constructor(props) {
        super(props)

        this.state = {
            show: true
        }
    }

    render() 
    {
        return (
            <div>
                <ReactCSSTransitionGroup transitionName="anim" 
                    transitionAppear={true} transitionAppearTimeout={5000} 
                    transitionEnter={true} transitionEnterTimeout={5000} 
                    transitionLeave={true} transitionLeaveTimeout={5000} >
                    {this.state.show && <h2>{'TutsPlus - Welcome to React Animations'}</h2>}
                </ReactCSSTransitionGroup>

                <button onClick={() => this.setState({show : !this.state.show})}>Toggle</button>

            </div>
        )
    }
};

render(
    <Home />,
    document.getElementById('app')
)