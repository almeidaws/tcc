import React from 'react';
import Field from './Field.jsx';
import Requisition from './../js/Requisition.js';
import RegisterCredentials from './UserCredentialsField.jsx';
const R = Requisition;

const NameField = props => <Field 
                                type="name"
                                placeholder="Enter Your Name"
                                icon="user"
                                required={true}
                                errorMessage={props.errorMessage}
                                value={props.value}
                                onChange={props.onChange}
                                />
// const EmailField = props => <Field 
//                                 type="email" 
//                                 placeholder="Enter Your Email" 
//                                 icon="envelope" 
//                                 required={true}
//                                 errorMessage={props.errorMessage}
//                                 value={props.value} 
//                                 onChange={props.onChange} />;
// const PasswordField = props => <Field 
//                                     type="password" 
//                                     placeholder="Enter Password" 
//                                     icon="lock" 
//                                     required={true}
//                                     errorMessage={props.errorMessage}
//                                     value={props.value} 
//                                     onChange={props.onChange} />;
const ConfirmPasswordField = props => <Field 
                                type="confirmPassword"
                                placeholder="Please, Repeat Your Password"
                                icon="lock"
                                required={true}
                                errorMessage={props.errorMessage}
                                value={props.value}
                                onChange={props.onChange}
                                />

const RegisterLink = props => <a onClick={props.onClick} href="javascript:{}" className="ms_btn">register now</a>
const LoginLink = props => <p>Already Have An Account? <a href="#myModal1" data-toggle="modal" className="ms_modal hideCurrentModel">login here</a></p>
const ErrorMessage = props => props.error ? <div className="text-warning" role="alert">{props.error}</div> : null;

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', email: '', password: '', confirmPassword: ''};
        this.handleName = this.handleName.bind(this);
        // this.handleEmail = this.handleEmail.bind(this);
        // this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleName(event) {
        this.setState({name: event.target.value, error: null});
    }
    // handleEmail(event) { 
    //     this.setState({ email: event.target.value, error: null }); 
    // }
    // handlePassword(event) { 
    //     this.setState({ password: event.target.value, error: null }); 
    // }
    handleConfirmPassword(event) {
        this.setState({ confirmPassword: event.target.value, error: null});
    }
    handleSubmit(event) {
        if (this.validateForm()) {
            // R.register(this.state.name,this.state.email,this.state.password,error => {
            //     if(error === 409) {
            //         this.setState({ error: "Error 409 requisition."})
            //     }
            // })
        }
    }
    validateForm() {
        const form = document.getElementById('registerForm');
        form.classList.add('was-validated');
        return form.checkValidity();
    }
    render() {
        return (
            <form className="ms_register_form" id="registerForm" noValidate>
                <h2>Register</h2>
                {/* <ErrorMessage error={this.state.error} /> */}
                <NameField value={this.state.name} onChange={this.handleName} errorMessage="Invalida name."/>
                {/* <EmailField value={this.state.email} onChange={this.handleEmail} errorMessage="Invalid email. Valid example: john@gmail.com"/>
                <PasswordField value={this.state.password} onChange={this.handlePassword} errorMessage="The password is required"/> */}
                <RegisterCredentials />
                <ConfirmPasswordField value={this.state.confirmPassword} onChange={this.handleConfirmPassword} errorMessage="Password is not equals up field."/>
                <RegisterLink onClick={this.handleSubmit}/>
                <LoginLink />
            </form>
        );
    }
};
const RegisterImage = props => <div className="ms_register_img"> <img src="images/register_img.png" alt="" className="img-fluid" /> </div>;
const CloseButton = props => <button type="button" className="close" data-dismiss="modal"> <i className="fa_icon form_close" /> </button>

class RegisterModal extends React.Component {
    render(){
        return (
            <div id="myModal" className="modal  centered-modal" role="dialog">
                <div className="modal-dialog register_dialog">
                  //Modal Content
                  <div className="modal-content">
                        <CloseButton/>
                        <div className="modal-body">                                    
                            <RegisterImage/>
                            <RegisterForm/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default RegisterModal;