import React, { Component } from "react";
import './resetpassword.scss';
class ResetPassword extends Component {
    render() {
        return (
            <div className="resetPasswordWrapper px-sm-4 px-2 py-md-3 col-md-6 col-lg-4 col-12">
                <h3 className="mb-4 text-center">Reset your password</h3>
                <div className="form-group">
                    <input type="password" className="form-control" name="password"  placeholder="New Password" required="required" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control"  placeholder="Confirm Password" required="required" />
                </div>
                <button className="text-center form-control mb-2 resetPasswordButton">Reset Password</button>
            </div>
        );
    }
}

export default ResetPassword;