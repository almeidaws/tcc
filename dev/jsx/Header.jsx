import React from 'react';
import ReactDOM from 'react-dom';
import Requisition from './../js/Requisition.js';
const R = Requisition;
import Utils from './../js/Utils.js';
const U = Utils;

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

/**
 * Menu presented on website's header when the user is currently logged. It currently only
 * presents the user's name provided through props.
 *
 * Property name: users'name. Example: 'Carlos'.
 */
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

/**
 * Renders the website's header presented on top of each page.
 * This component conditionally present buttons for registering/logging
 * or user's information if the user is logged or not.
 *
 * To know if the user is logged this components checks the if there's 
 * a cookie named 'name' that contains user's name.
 */
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: U.getCookie('name') };
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

export default Header;
