import React, { Component } from "react";
import fetch from 'isomorphic-fetch';
import './login.scss';
import { Link } from "react-router-dom";
import avatar from '../../media/avatar.png'

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.state = {
            isLoggedIn: false,
            authToken: null
        };
    }

    generateToken = () => {
        const data = {
            email: this.emailInput.current.value,
            password: this.passwordInput.current.value,
        };
        return fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
        }).then(res => res.json()).then(data => {
            if (data.statusCode === 200) {
                this.setState({
                    ...this.state,
                    isLoggedIn: true,
                    authToken: data.token
                });
                this.goToWelcomePage();
            }
            else
                console.log("Error");
        }).catch(err => console.log(err));
    }

    goToWelcomePage = () => {
        if (this.state.isLoggedIn) {
            return fetch('/api/auth/me', {
                method: 'GET',
                headers: {
                    'x-auth-token': this.state.authToken
                }
            }).then(res => res.json()).then(data => {
                if (data.statusCode === 200) {
                    this.props.history.push({
                        pathname: '/welcome',
                        state: {
                            userData: { ...data.user }
                        }
                    });
                }
            }).catch(err => console.log(err));
        }
    }

    render() {
        return (
            <div className='logInWrapper px-sm-4 px-2 py-5 col-sm-6 col-12'>
                <div className="text-center mb-4 mt-md-0 mt-5">
                    <img className="avatarImage" src = {avatar} alt="avatar" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" name="username" ref={this.emailInput} placeholder="Username" required="required" />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" name="password" ref={this.passwordInput} placeholder="Password" required="required" />
                </div>
                <button className="text-center form-control mb-2 logInButton" onClick={this.generateToken}>Log In</button>
                <span className="mr-2">Don't have an account?</span><Link to='/register'>Sign up here</Link>
            </div>
        );
    }
}
export default LogIn;