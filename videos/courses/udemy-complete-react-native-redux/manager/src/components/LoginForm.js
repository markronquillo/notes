import React, { Component } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { Card, Input, CardSection, Button, Spinner } from './common'
import { emailChanged, passwordChanged, loginUser } from '../actions/'

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text)
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }

  onLogin() {
    this.props.loginUser(this.props.auth)
  }

  renderButton() {
    if (this.props.auth.loading) {
      return <Spinner size="large" />
    }

    return (
      <Button onPress={this.onLogin.bind(this)}>Login</Button>
    )
  }

  render() {
    const { email, password, error } = this.props.auth
    return (
      <Card>
        <CardSection>
          <Input 
            label="Email"
            value={email}
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            />
        </CardSection>

        <CardSection>
          <Input 
            secureTextEntry
            value={password}
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    ) 
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20, 
    alignSelf: 'center',
    color: 'red'
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm)
