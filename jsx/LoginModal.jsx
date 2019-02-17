const emailInput = (
    <div className="form-group">
        <input type="text" placeholder="Enter Your Email" className="form-control" />
        <span className="form_icon">
            <i className="fa_icon form-envelope" aria-hidden="true" />
        </span>
    </div>
);

const passwordInput = (
    <div className="form-group">
        <input type="password" placeholder="Enter Password" className="form-control" />
        <span className="form_icon">
            <i className="fa_icon form-lock" aria-hidden="true" />
        </span>
    </div>
);

const forgotPasswordLink = (
    <div className="popup_forgot">
        <a href="#">Forgot Password ?</a>
    </div>
);

const LoginModal = props => (
    <div id="myModal1" className="modal  centered-modal" role="dialog">
        <div className="modal-dialog login_dialog">
            // Modal content
            <div className="modal-content">
                <button type="button" className="close" data-dismiss="modal">
                    <i className="fa_icon form_close" />
                </button>
                <div className="modal-body">
                    <div className="ms_register_img">
                        <img src="images/register_img.png" alt="" className="img-fluid" />
                    </div>
                    <form className="ms_register_form">
                        <h2>login / Sign in</h2>
                        {emailInput}
                        {passwordInput}
                        {forgotPasswordLink}
                        <a href="profile.html" className="ms_btn" target="_blank">login now</a>
                        <p>Don't Have An Account? <a href="#myModal" data-toggle="modal" className="ms_modal1 hideCurrentModel">register here</a></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
);

ReactDOM.render(<LoginModal />, document.getElementById('loginModal'));
