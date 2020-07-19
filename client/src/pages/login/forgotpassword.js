import React, { Component } from "react";
import { Link } from "react-router-dom";
import './forgotpassword.scss';

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.sendEmailInput = React.createRef();
        this.state = {
            showForgetPasswordSection: false,
            recoveryEmailSent : false,
        };
    }

    showForgotPasswordSection = () => {
        this.setState({
            showForgetPasswordSection: true,
        });
    }

    sendEmail = () => {
        return fetch('/api/send_email', {
            method: 'POST',
            body: JSON.stringify({ recoveryMailId: this.sendEmailInput.current.value }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
        }).then(res => res.json()).then(data => {
            if(data.statusCode === 200)
            {
                this.setState({
                    recoveryEmailSent: true,
                });
            }
        }

        ).catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <Link className="d-block" onClick={this.showForgotPasswordSection}>Forgot password?</Link>
                <div className={this.state.showForgetPasswordSection ? "mt-3" : "d-none"}>
                    <div className="form-group">
                        <input type="text" className="form-control" name="email" ref={this.sendEmailInput} placeholder="Enter email" required="required" />
                    </div>
                    <button className="text-center form-control mb-2 sendEmailButton" onClick={this.sendEmail}>Send Email</button>
                    <span className={this.state.recoveryEmailSent ? "mt-2 recoveryMailConfirmation" : "d-none"}>One mail has been sent to this email to reset password</span>
                </div>
            </>
        );
    }
}

export default ForgotPassword;