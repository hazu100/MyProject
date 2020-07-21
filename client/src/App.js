import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Registration from './pages/registration/registration';
import LogIn from './pages/login/login';
import Welcome from './pages/welcome/welcome';
import './App.scss';
import ResetPassword from './pages/resetpassword/resetpassword';

const App = () => {
    return (
        <Router>
            <div className="appWrapper">
                <div className ="container appContainer px-0">
                <Switch>
                    <Route exact path='/' component={LogIn} />
                    <Route exact path ='/reset' component = {ResetPassword} />
                    <Route exact path='/register' component={Registration} />
                    <Route exact path='/welcome' component={Welcome} />
                </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;