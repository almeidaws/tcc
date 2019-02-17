class EmailField extends React.Component {
    render() {
        return (
            <div className="form-group">
                <input type="text" placeholder="Enter Your Email" className="form-control" data-rule="required|email"/>
                <span className="form_icon">
                    <i className="fa_icon form-envelope" aria-hidden="true" />
                </span>
            </div>
        );
    }
};

class PasswordField extends React.Component {
    render() {
        return (
            <div className="form-group">
                <input type="password" placeholder="Enter Password" className="form-control" />
                <span className="form_icon">
                    <i className="fa_icon form-lock" aria-hidden="true" />
                </span>
            </div>
        );
    }
};

const ForgotPasswordLink = props => (
    <div className="popup_forgot">
        <a href="#">Forgot Password ?</a>
    </div>
);

class LoginForm extends React.Component {
    render() {
        return (
            <form className="ms_register_form" id="loginForm">
                <h2>login / Sign in</h2>
                <EmailField />
                <PasswordField />
                <ForgotPasswordLink />
                <a href="profile.html" className="ms_btn" target="_blank">login now</a>
                <p>Don't Have An Account? <a href="#myModal" data-toggle="modal" className="ms_modal1 hideCurrentModel">register here</a></p>
            </form>
        );
    }
};

const RegisterImage = props => (
    <div className="ms_register_img">
        <img src="images/register_img.png" alt="" className="img-fluid" />
    </div>
);

const CloseButton = props => (
    <button type="button" className="close" data-dismiss="modal">
        <i className="fa_icon form_close" />
    </button>
);
    
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
