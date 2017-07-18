import React from 'react'
import Falcor from 'falcor'
import falcorModel from '../falcorModel'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return { }
}

class LoginView extends React.Component {
    render() {
        return (
            <div>
                <h1> Login view </h1>
                Form goes here
            </div>
        )
    }
}

export default LoginView;