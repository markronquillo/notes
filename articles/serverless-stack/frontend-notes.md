# Setting up the frontend

## Create a New React.js App

- `npm install -g create-react-app`
- `create-react-app notes-app-client`

## Add Favicon, Font, React Bootstrap

## Handle routes with React Router

RUN `npm install --save react-router-dom`

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
```

#### Create containers

Note: Higher Order Component - withRouter


Make sure that in making a container, a react component that uses a function only, to follow this: use `()` not `{}`. 

```javascript
export default () => (
	<div> </div>
)
```

## Add the User Token to the State

#### Storing the User Token

We need to store the userToken after the user has signed in. To do this:

We first created, inside the App.js render function
```
const childProps = {
  userToken: this.state.userToken,
  updateUserToken: this.updateUserToken,
};
```

and another HoC Route that passes props to its child.

```
import React from 'react';
import { Route } from 'react-router-dom';

export default ({ component: C, props: cProps, ...rest }) => (
  <Route {...rest} render={ props => <C {...props} {...cProps} /> } />
);
```

Inside the Login.js, we now call the updateUserToken to pass the authentication userToken.

We then update our navigation so that if we have a userToken we show the logout link else, we display the login and signup link.

#### Loading the State from the Session

We now have an access to the userToken after the user has authenticated.

One way to make the userToken persist even if the user refresh or close the browser, is to use localStorage or Cookies. AWS Cognito JS SDK automatically handles it for us, so basically it is already stored for use whenever we authenticate using the SDK.

Note that the SDK doesn't store the token, but it stores a customer data that we can use to get another token, without the user entering their authentication credentials again.

During the componentDidMount method of App.js, we try to load if there is an already authenticated user using the SDK. If currentUser exists, we get a token and set the userToken state.


#### Redirect on Login and Logout

To complete the login flow we are going to need to do two more things:

1. Redirect the user to the homepage after they login.
2. And redirect them back to the login page after they logout.

We are going to use the `withRouter` HoC and the `this.props.history.push` method that comes with React Router v4.

Q: What does withRouter does? this HoC adds the history prop to our component. -- `this.props.history.push('/');`

- To redirect the user back to the homepage after logging in, we need to call `this.props.history.push('/')` inside the handleSubmit method of Login Component.

- To redirect the user back to login after they logout. -- `this.props.history.push('/login')`


#### Give Feedback While Logging In

We created a HoC for the Loading button, it accepts an isLoading state that disables the button and shows a spinning glyphicon to indicate the loading state.



## Create a Signup Page

The signup page is quite similar to the login page that we just created. But it has a couple of key differences. When we sign the user up, AWS Cognito sends them a confirmation code via email. And we need to authenticate the new user once it’s been confirmed.

And so the signup flow will look something like this:

- The user types in their email, password, and confirms their password.

- We sign them up using AWS Cognito and get a user object in return.

- We then render a form to accept the confirmation code that AWS Cognito has emailed to them.

- We send the confirmation code to AWS Cognito.

- We authenticate the user and get a user token in return.

- Finally, we update the app state with the user token.


#### Create a signup page

The signup page consists of signup form and the confirmation form. It automatically renders the confirmation form after the signup form was submitted.


#### Signup with AWS Cognito

Create a Signup page and a confirmation page

To Create CognitoUserPool object you need
```
{
	UserPoolId: config.cognito.USER_POOL_ID,
	ClientId: config.cognito.APP_CLIENT_ID
}
```

To create a CognitoUser, you need to pass an object containing

```
{
	Username: '',
	Pool: '',
}
```

## Add the Create Note Page

This chapter only discusses how to display the new note UI.


#### Call the Create API

We create a library for calling the API Gateway.

This API Gateway (right now) create new note using the endpoint we have made earlier.

#### Upload a File to S3


