import React, { Component } from "react";
import fetch from 'isomorphic-fetch';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.state = {
            isRegistered: false,
        };
    }

    register = (e) => {
        e.preventDefault();
        const data = {
            name: this.nameInput.current.value,
            email: this.emailInput.current.value,
            password: this.passwordInput.current.value,
        };
        return fetch('/api/registration', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
        }).then(res => {
            if (res.status === 200) {
                console.log(res);
                this.setState({
                    isRegistered: true,
                });
                this.nameInput.current.value = null;
                this.emailInput.current.value = null;
                this.passwordInput.current.value = null;
                return res;
            }
            console.log("Error");

        }).catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                <input type="text" name="name" ref={this.nameInput} placeholder="Enter your name" />
                <input type="text" name="email" ref={this.emailInput} placeholder="Enter your email" />
                <input type="password" name="password" ref={this.passwordInput} placeholder="Enter your password" />
                <button onClick={this.register}>Register</button>
                <span className={this.state.isRegistered ? "d-block" : "d-none"} style={{}}>You have successfully registered</span>
                <button onClick={() => this.props.history.push('/')}>Log In</button>
            </div>
        );
    }
}
export default Registration;