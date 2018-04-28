import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Search from './components/Search/Search.js';
import Album from './components/Album/Album.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Search} />
          <Route path="/album/:name" component={Album} />
        </div>
      </Router>
    );
  }
}

export default App;
