import React from 'react';
import { MemoryRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Registration from './pages/registration/registration';
import LogIn from './pages/login/login';
import Welcome from './pages/welcome/welcome';
const App = () => {
    return (
        <Router>
            <div className="App">

                <Switch><Route exact path='/'>
                    <ul className="App-header">
                        <li>
                            <Link to="/register">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </Route>
                    <Route exact path='/register' component={Registration} />
                    <Route exact path='/login' component={LogIn} />
                    <Route exact path='/welcome' component={Welcome} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;