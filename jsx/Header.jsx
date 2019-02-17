const registerButton = <a href="javascript:;" className="ms_btn login_btn" data-toggle="modal" data-target="#myModal"><span>Register</span></a>;
const loginButton = <a href="javascript:;" className="ms_btn login_btn" data-toggle="modal" data-target="#myModal1"><span>login</span></a>;
const searchButton = (
    <div>
        <input type="text" className="form-control" placeholder="Search Music Here.." />
        <span className="search_icon">
            <img src="images/svg/search.svg" alt="" />
        </span>
    </div>
);

const unloggedMenu = <div className="ms_top_btn">{registerButton}{loginButton}</div>;

const LoggedMenu = props => (
    <div className="ms_top_btn">
        <a href="javascript:;" className="ms_admin_name">Hello {props.name} <span className="ms_pro_name">{props.name.charAt(0)}</span>													
        </a>
        <ul className="pro_dropdown_menu">
            <li><a href="profile.html">Profile</a></li>
            <li><a href="manage_acc.html" target="_blank">Pricing Plan</a></li>
            <li><a href="blog.html" target="_blank">Blog</a></li>
            <li><a href="">Setting</a></li>
            <li><a href="">Logout</a></li>
        </ul>
    </div>
);

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: getCookie('name') };
    }
    render() {
        return (
            <div className="ms_header">
                <div className="ms_top_left">
                    <div className="ms_top_search">
                        {searchButton}
                    </div>
                </div>
                <div className="ms_top_right">
                    {this.state.name ? LoggedMenu({ name: this.state.name }) : unloggedMenu}
                </div>
            </div>
       );
   }
};

ReactDOM.render(<Header />, document.getElementById('header'));
