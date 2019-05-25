import React from 'react';
import EmailField from './EmailField.jsx';
import PasswordField from './PasswordField.jsx';
import Requisition from './../js/Requisition.js';
const R = Requisition;

const ForgotPasswordLink = props => <div className="popup_forgot"><a href="#">Forgot Password ?</a></div>;
const LoginLink = props => <a onClick={props.onClick} href="javascript:{}" className="ms_btn" target="_blank">login now</a>;
const RegisterLink = props => <p>Don't Have An Account? <a href="#myModal" data-toggle="modal" className="ms_modal1 hideCurrentModel">register here</a></p>
const ErrorMessage = props => props.error ? <div className="text-warning" role="alert">{props.error}</div> : null;

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmail(event) { 
        this.setState({ email: event.target.value, error: null }); 
    }
    handlePassword(event) { 
        this.setState({ password: event.target.value, error: null }); 
    }
    handleSubmit(event) { 
        if (this.validateForm()) {
            R.login(this.state.email, this.state.password, (errorCode, errorThrown) => {
                if (errorCode == 401)
                    this.setState({ error: "Invalid email or password" });
                else
                    this.setState({ error: "Unkown error of code " + errorCode + "." });
            }, () => this.setState({ error: null }));
        }
    }
    validateForm() {
        const form = document.getElementById('loginForm');
        form.classList.add('was-validated');
        return form.checkValidity();
    }
    render() {
        return (
            <form className="ms_register_form" id="loginForm" noValidate>
                <h2>login / Sign in</h2>
                <ErrorMessage error={this.state.error} />
                <EmailField value={this.state.email} onChange={this.handleEmail} errorMessage="Invalid email. Valid example: john@gmail.com"/>
                <PasswordField value={this.state.password} onChange={this.handlePassword} errorMessage="The password is required"/>
                <ForgotPasswordLink />
                <LoginLink onClick={this.handleSubmit}/>
            </form>
        );
    }
};

const RegisterImage = props => <div className="ms_register_img"> <img src="images/register_img.png" alt="" className="img-fluid" /> </div>;
const CloseButton = props => <button type="button" className="close" data-dismiss="modal"> <i className="fa_icon form_close" /> </button>;
    
class LoginModal extends React.Component {
    render() {
        return (
            <div id="myModal1" className="modal centered-modal" role="dialog">
                <div className="modal-dialog login_dialog">
                    // Modal content
                    <div className="modal-content">
                        <CloseButton />
                        <div className="modal-body">
                            <RegisterImage />
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
       );
   }
};

export default LoginModal;
