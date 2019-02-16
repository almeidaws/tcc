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
const header = (
    <div className="ms_header">
        <div className="ms_top_left">
            <div className="ms_top_search">
                {searchButton}
            </div>
        </div>
        <div className="ms_top_right">
            <div className="ms_top_btn">
                {registerButton} 
                {loginButton}
            </div>
        </div>
    </div>
);

ReactDOM.render(header, document.getElementById('header'));
