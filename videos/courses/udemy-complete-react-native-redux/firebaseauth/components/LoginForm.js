import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebase from 'firebase'
import { Button, Card, CardSection, Input, Spinner } from './common/'

class LoginForm extends Component
{
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({error: '', loading: true})

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response)
        this.setState({ email: '', password: '', error: ''})
      })
      .catch((error) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
      })
      .catch(() => {
        this.setState({ error: 'Authentication Failed.'});
      })
      .then(() => {
        this.setState({loading: false})
      })
  }

  renderButton()
  {
    if (this.state.loading) {
      return <Spinner size="small" />
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    )
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder={"user@gmail.com"}
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })} />
        </CardSection>
        <CardSection> 
          <Input
            secureTextEntry={true}
            label="Password"
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            />
        </CardSection>
        <Text style={styles.textStyle}>
          {this.state.error}
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

export default LoginForm
