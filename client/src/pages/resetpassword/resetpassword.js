import React, { Component } from "react";
import './resetpassword.scss';
class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.newPasswordInput = React.createRef();
        this.confirmNewPasswordInput = React.createRef();
        this.state = {
            isPasswordChanged: false,
            showNewPass : false,
            showConfirmNewPass : false,
        };
    }

    toggleShowNewPassword = () => {
        this.setState({
            showNewPass: !this.state.showNewPass,
        });
    };

    toggleShowConfirmNewPassword = () => {
        this.setState({
            showConfirmNewPass: !this.state.showConfirmNewPass,
        });
    };

    resetPassword = () => {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const user = urlParams.get('user');
        const token = urlParams.get('token')
        const newPasswordValue = this.newPasswordInput.current.value;
        const confirmNewPasswordValue = this.confirmNewPasswordInput.current.value;

        if (newPasswordValue === confirmNewPasswordValue) {
            return fetch(`/api/reset_password/${user}/${token}`, {
                method: 'PUT',
                body: JSON.stringify({ newPassword: newPasswordValue }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                }
            }).then(res => res.json()).then(data => {
                if (data.statusCode === 200) {
                    this.setState({
                        isPasswordChanged: true,
                    });
                }
            }

            ).catch(err => console.log(err));
        }
    };

    render() {
        return (
            <div className="resetPasswordWrapper px-sm-4 px-2 py-md-3 col-md-6 col-lg-4 col-12">
                <h3 className="mb-4 text-center">Reset your password</h3>
                <div className="form-group d-flex newPassWrapper">
                    <input type={this.state.showNewPass ? "text":"password"} className="form-control" name="newPassword" ref={this.newPasswordInput} placeholder="New Password" required="required" />
                    <span className={`newPasswordToggleField ${this.state.showNewPass ? "fa fa-eye-slash" : "fa fa-eye"}`} onClick={this.toggleShowNewPassword} />
                </div>
                <div className="form-group d-flex newConfirmPassWrapper">
                    <input type={this.state.showConfirmNewPass ? "text":"password"} className="form-control" ref={this.confirmNewPasswordInput} placeholder="Confirm Password" required="required" />
                    <span className={`confirmNewPasswordToggleField ${this.state.showConfirmNewPass ? "fa fa-eye-slash" : "fa fa-eye"}`} onClick={this.toggleShowConfirmNewPassword} />
                </div>
                <button className="text-center form-control mb-2 resetPasswordButton" onClick={this.resetPassword}>Reset Password</button>
                <span className={this.state.isPasswordChanged ? "mb-2 changePassword" : "d-none"}>You have successfully changed your password</span>
                <button className={this.state.isPasswordChanged ?"text-center form-control mb-2 gotoLoginPage":"d-none"} onClick={()=>this.props.history.push('/')}>Log In</button>
            </div>
        );
    }
}

export default ResetPassword;