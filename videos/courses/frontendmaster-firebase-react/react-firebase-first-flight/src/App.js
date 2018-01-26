import React, { Component } from 'react';
import { database } from './firebase';

import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      newData: ''
    }
  }

  handleChange(e) {
    const newData = e.target.value;
    this.setState({ newData });
  }

  componentDidMount() {
    database.ref().on('value', (snapshot) => {
      this.setState({
        data: snapshot.val()
      })
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    database.ref()
      .child('AMAZINGNEWDATA')
      .set(this.state.newData)
  }

  render() {
    return (
      <div className="App">
        <div className="App--header">
          <h2>Welcome to React and Firebase</h2>
        </div>
        <pre className="App--data">
          { JSON.stringify(this.state.data, null, 2) }
        </pre>

        <form className="App--form" 
          onSubmit={this.handleSubmit.bind(this)}>
          <input 
            type="text" 
            value={this.state.newData} 
            onChange={this.handleChange.bind(this)} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
