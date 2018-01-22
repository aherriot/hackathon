import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import '../styles/normalize.css'
import '../styles/skeleton.css'
import '../styles/App.css'

import Home from './Home'
import Ideas from './Ideas/redux/container'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/ideas" component={Ideas} />
      </Switch>
    )
  }
}

export default App
