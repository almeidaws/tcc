import React from 'react';
import EmailField from './EmailField.jsx';
import PasswordField from './PasswordField.jsx';

const ErrorMessage = props => props.error ? <div className="text-warning" role="alert">{props.error}</div> : null;

class RegisterCredentials extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
    }
    handleEmail(event) { 
        this.setState({ email: event.target.value, error: null }); 
    }
    handlePassword(event) { 
        this.setState({ password: event.target.value, error: null }); 
    }
    handleValidate(event) {
        if(this.validateCredentials()) {
            this.setState({error: null})
        }
    }
    validateForm() {
        const form = document.getElementById('registerForm');
        form.classList.add('was-validated');
        return form.checkValidity();
    }
    render() {
        return (
            <div>
                <ErrorMessage error={this.state.error} />
                <EmailField value={this.state.email} onChange={this.handleEmail} errorMessage="Invalid email. Valid example: john@gmail.com"/>
                <PasswordField value={this.state.password} onChange={this.handlePassword} errorMessage="The password is required"/>
            </div>
        );
    }
}
export default RegisterCredentials;