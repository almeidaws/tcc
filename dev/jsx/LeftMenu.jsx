import React from 'react';

const LeftMenu = props => {
    return (
        <div className="ms_sidemenu_wrapper">
            <div className="ms_nav_close">
                <i className="fa fa-angle-right" aria-hidden="true"/>
            </div>
            <div className="ms_sidemenu_inner">
                <div className="ms_logo_inner">
                    <div className="ms_logo">
                        <a href="./index.html"><img src="./images/logo.png" alt=""
                                                         className="img-fluid"/></a>
                    </div>
                    <div className="ms_logo_open">
                        <a href="./index.html"><img src="./images/open_logo.png" alt=""
                                                         className="img-fluid"/></a>
                    </div>
                </div>
                <div className="ms_nav_wrapper">
                    <ul>
                        <li>
                            <a href="./index.html" className="active" title="Discover">
                                <span className="nav_icon">
                                    <span className="icon icon_discover"/>
                                </span>
                                <span className="nav_text">
                                    discover
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="./genres.html" title="Genres">
                                <span className="nav_icon">
                                    <span className="icon icon_genres"/>
                                </span>
                                <span className="nav_text">
                                    genres
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="./favourite.html" title="Favourites">
                                <span className="nav_icon">
                                    <span className="icon icon_favourite"/>
                                </span>
                                <span className="nav_text">
                                    favourites
                                </span>
                            </a>
                        </li>
                    </ul>
                    <ul className="nav_playlist">
                        <li>
                            <a href="./add_playlist.html" title="Create Playlist">
                                <span className="nav_icon">
                                    <span className="icon icon_c_playlist"/>
                                </span>
                                <span className="nav_text">
                                    create playlist
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default LeftMenu;
