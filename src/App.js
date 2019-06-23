import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Page1 from './pages/Page1';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Link to="/">Home</Link>
          <br />
          <Link to="/page1">Page 1</Link>
          <br />
          <Link to="/dashboard">Dashboard</Link>
        </header>
        <div className="main">
          <Switch>
            <Route exact path="/page1" component={ Page1 } />
            <Route exact path="/dashboard" render={ Dashboard } />
            <Route exact path="/" render={ Home } />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
