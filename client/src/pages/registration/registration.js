import React, { Component } from "react";
import fetch from 'isomorphic-fetch';
import './registration.scss';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.resetForm = React.createRef();
        this.state = {
            name: '',
            email: '',
            password: '',
            isRegistered: false,
            isError: false,
            showPassword: false,
            errorMessage: [],
        };
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    toggleShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        })
    }

    register = (e) => {
        e.preventDefault();
        const { name, email, password } = this.state;
        const data = {
            name,
            email,
            password,
        };
        return fetch('/api/registration', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
        }).then(res => res.json())
            .then(data => {
                if (data.statusCode === 200) {
                    this.setState({
                        ...this.state,
                        isRegistered: true,
                        isError : false,
                    });
                    this.resetForm.reset();
                    return data;
                }
                if (data.errorType === "validation") {
                    this.setState({
                        ...this.state,
                        isError : true,
                        errorMessage: data.errors[0].msg,
                    });
                }
               else if (data.errorType === "duplicate") {
                    this.setState({
                        ...this.state,
                        isError : true,
                        errorMessage: data.message
                    });
                }
                return data;
            })
            .catch(err => console.log(err));
    }
    render() {
        const { history } = this.props;
        return (
            <form ref={this.resetForm} onSubmit={this.register} className="formWrapper px-sm-4 px-2 py-md-3 col-md-6 col-lg-4 col-12">
                <h3 className="registrationHeading mt-2 mb-4 text-center">Registration</h3>
                <div className="form-group d-flex">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <span class="fa fa-user" />
                        </span>
                    </div>
                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleInput} placeholder="Enter your name" />
                </div>
                <div className="form-group d-flex">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <span class="fa fa-envelope" />
                        </span>
                    </div>
                    <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.handleInput} placeholder="Enter your email" />
                </div>
                <div className="form-group d-flex">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <span class="fa fa-lock" />
                        </span>
                    </div>
                    <input type={this.state.showPassword ? "text" : "password"} className="form-control" name="password" value={this.state.password} onChange={this.handleInput} placeholder="Set your password" />
                    <span className={`passwordToggleField ${this.state.showPassword ? "fa fa-eye-slash" : "fa fa-eye"}`} onClick={this.toggleShowPassword} />
                </div>
                <p className={this.state.isError ? "errorMessage mb-3" : "d-none"}>{this.state.errorMessage}</p>
                <div className="form-group">
                    <button className="form-control mb-2 registrationButton" type="submit">Register</button>
                </div>
                <p className={this.state.isRegistered ? "mb-3 successRegistration" : "d-none"}>You have successfully registered</p>
                <div className="form-group">
                    <button className={this.state.isRegistered ? "form-control goToLogInPageButton" : "d-none"} onClick={() => history.push('/')}>Log In</button>
                </div>
            </form>
        );
    }
}
export default Registration;