class Field extends React.Component {
    render() {
        return (
            <div className="form-group">
                <input 
                    type={this.props.type} 
                    placeholder={this.props.email} 
                    className="form-control" 
                    value={this.props.value} 
                    onChange={this.props.onChange}/>
                <span className="form_icon">
                    <i className={"fa_icon form-" + this.props.icon} aria-hidden="true" />
                </span>
            </div>
        );
    }
};

const EmailField = props => <Field 
                                type="text" 
                                placeholder="Enter Your Email" 
                                icon="envelope" 
                                value={props.value} 
                                onChange={props.onChange} />;
const PasswordField = props => <Field 
                                    type="password" 
                                    placeholder="Enter Password" 
                                    icon="lock" 
                                    value={props.value} 
                                    onChange={props.onChange} />;
const ForgotPasswordLink = props => <div className="popup_forgot"><a href="#">Forgot Password ?</a></div>;
const LoginLink = props => <a href="profile.html" className="ms_btn" target="_blank">login now</a>;
const RegisterLink = props => <p>Don't Have An Account? <a href="#myModal" data-toggle="modal" className="ms_modal1 hideCurrentModel">register here</a></p>

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }
    handleEmail(event) { 
        this.setState({ email: event.target.value }); 
    }
    handlePassword(event) { 
        this.setState({ password: event.target.value }); 
    }
    render() {
        return (
            <form className="ms_register_form" >
                <h2>login / Sign in</h2>
                <EmailField value={this.state.email} onChange={this.handleEmail}/>
                <PasswordField value={this.state.password} onChange={this.handlePassword}/>
                <ForgotPasswordLink />
                <LoginLink />
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
