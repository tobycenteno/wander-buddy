import React, { useState, useEffect } from 'react'
import Home from './pages/Home';
import Country from './pages/Country'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

function App() {

  const onPopState = handler => {
    window.onpopstate = handler;
  }
  useEffect(() => {
    onPopState((event) => {
      console.log(event.state);
    })
  });

  return (
    <Router >
      <div className="App">
        <Switch>
          <Route exact path="/wander-buddy" component={Home} />
          <Route exact path="/wander-buddy/:country" component={Country} />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
