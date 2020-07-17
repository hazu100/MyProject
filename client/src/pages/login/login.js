import React, { Component } from "react";
import fetch from 'isomorphic-fetch';

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
            <div>
                <input type="text" name="email" ref={this.emailInput} placeholder="Enter your email" />
                <input type="password" name="password" ref={this.passwordInput} placeholder="Enter your password" />
                <button onClick={this.generateToken}>Log In</button>
                <button onClick={() => this.props.history.push('/')}>Back</button>
            </div>
        );
    }
}
export default LogIn;