import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Registration from './pages/registration/registration';
import LogIn from './pages/login/login';
import Welcome from './pages/welcome/welcome';
import './App.scss';

const App = () => {
    return (
        <Router>
            <div className="appWrapper">
                <div className ="container appContainer px-0">
                <Switch>
                    <Route exact path='/' component={LogIn} />
                    <Route exact path='/register' component={Registration} />
                    <Route exact path='/welcome' component={Welcome} />
                </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;