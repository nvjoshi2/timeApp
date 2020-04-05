import React from 'react';
import './App.css';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';
import RegisterPage from './components/pages/RegisterPage';
import HistoryPage from './components/pages/HistoryPage';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import NavBar from './components/navbar/Navbar';
import ToolBar from './components/navbar/Toolbar';
import LandingPage from './components/pages/LandingPage';
function App() {
  return (
    <Router history = {history}>
      <ToolBar/>
      <div className="App">
          <Switch>
          <Route path='/' exact component={LandingPage}/>
          <Route path='/login' exact component={LoginPage}/>
          <Route path='/register' exact component={RegisterPage}/>
          <Route path='/home' exact component={HomePage}/>
          <Route path='/history' exact component={HistoryPage}/>
          </Switch>
      </div>
    </Router>
  );
}
                                                                                                     
export default App;
