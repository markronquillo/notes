import React from 'react'
import { render } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


class Home extends React.Component 
{
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            name: ''
        }

        this.add = this.add.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({name:e.target.value})
    }

    handleDelete(id) {
        const data = this.state.data.filter((val) => {
            if (val.id === id) 
                return false

            return true
        })

        this.setState({ data })
    }

    add(){
        var arr = this.state.data.slice();
        arr.push({'id':(new Date()).getTime(),'name':this.state.name})
        this.setState({data:arr})
    }

    render() 
    {
        return (
            <div>
                Enter Name <input onChange={this.handleChange} type="text" /> <input onClick={this.add} type="button" value="Add" />

                <ul>
                    <ReactCSSTransitionGroup transitionName="anim" 
                        transitionAppear={false} 
                        transitionEnterTimeout={2000} 
                        transitionEnter={true} 
                        transitionLeaveTimeout={2000} 
                        transitionLeave={true}>
                    {
                      this.state.data.map(function(player) {
                         return (
                            <li key={player.id}>
                                {player.name}
                                <a style={{marginLeft: "10px", color: "red"}} href="#" onClick={() => this.handleDelete(player.id)}>x</a>
                            </li>
                        )
                      }.bind(this))
                    }
                    </ReactCSSTransitionGroup>
                </ul>
            </div>
        )
    }
};

render(
    <Home />,
    document.getElementById('app')
)