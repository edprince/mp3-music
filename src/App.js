import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import * as Routes from './Routes.js';
import 'bulma/css/bulma.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Home from './components/Home.js';
import Menu from './components/Menu.js';
import CreatePlaylist from './components/CreatePlaylist.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <div className="">
          <BrowserRouter>
            <Switch>
              <Route path='/' component={Home} exact />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/create' component={CreatePlaylist} />
              <Route path='/playlist/:id' component={Routes.PlaylistRoute} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
