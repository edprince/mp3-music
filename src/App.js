import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import "bulma/css/bulma.min.css";
import './App.css';
import Login from './components/Login.js';
import Home from './components/Home.js';
import Menu from './components/Menu.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <div className="content">
          <BrowserRouter>
            <Switch>
              <Route path='/' component={Home} exact />
              <Route path='/login' component={Login} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
