const EmailField = props => <Field 
                                type="email" 
                                placeholder="Enter Your Email" 
                                icon="envelope" 
                                required={true}
                                errorMessage={props.errorMessage}
                                value={props.value} 
                                onChange={props.onChange} />;
const PasswordField = props => <Field 
                                    type="password" 
                                    placeholder="Enter Password" 
                                    icon="lock" 
                                    required={true}
                                    errorMessage={props.errorMessage}
                                    value={props.value} 
                                    onChange={props.onChange} />;
const ForgotPasswordLink = props => <div className="popup_forgot"><a href="#">Forgot Password ?</a></div>;
const LoginLink = props => <a onClick={props.onClick} href="javascript:{}" className="ms_btn" target="_blank">login now</a>;
const RegisterLink = props => <p>Don't Have An Account? <a href="#myModal" data-toggle="modal" className="ms_modal1 hideCurrentModel">register here</a></p>

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmail(event) { 
        this.setState({ email: event.target.value }); 
    }
    handlePassword(event) { 
        this.setState({ password: event.target.value }); 
    }
    handleSubmit(event) { 
        if (this.validateForm()) {
            R.login(this.state.email, this.state.password);
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
                <EmailField value={this.state.email} onChange={this.handleEmail} errorMessage="Invalid email. Valid example: john@gmail.com"/>
                <PasswordField value={this.state.password} onChange={this.handlePassword} errorMessage="The password is required"/>
                <ForgotPasswordLink />
                <LoginLink onClick={this.handleSubmit}/>
            </form>
        );
    }
};

const RegisterImage = props => <div className="ms_register_img"> <img src="images/register_img.png" alt="" className="img-fluid" /> </div>;
const CloseButton = props => <button type="button" className="close" data-dismiss="modal"> <i className="fa_icon form_close" /> </button>
    
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

ReactDOM.render(<LoginModal />, document.getElementById('loginModal'));
