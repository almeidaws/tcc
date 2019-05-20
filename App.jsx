import React, {Component} from 'react';
import Header from './dev/jsx/Header.jsx';
import RecentlyPlayedMusic from './dev/jsx/RecentlyPlayed/RecentlyPlayedMusic.jsx';
import AudioPlayerBar from "./dev/jsx/BarMusic/AudioPlayerBar.jsx";
import RegisterModal from "./dev/jsx/RegisterModal.jsx";
import LoginModal from "./dev/jsx/LoginModal.jsx";
import R from "./dev/js/Requisition";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            musics: [],
            selectedTreck: '',
            player: '',
        };

        R.getAllMusics((musics) => {
            this.setState({musics: musics  === undefined ? [] : musics});
        });
    }

    render() {

        const playMusic = (url) => {
            this.setState({ ...this.state, selectedTreck: url });

            const audio = new Audio(url);
            audio.play();
        };

        return (
            <div>
                <div className="ms_main_wrapper">
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
                    <div className="ms_content_wrapper padder_top80">
                        <Header/>
                        <RecentlyPlayedMusic musics={this.state.musics} play={playMusic}/>
                        <div className="ms_weekly_wrapper">
                            <div className="ms_weekly_inner">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="ms_heading">
                                            <h1>weekly top 15</h1>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-12 padding_right40">
                                        <div className="ms_weekly_box">
                                            <div className="weekly_left">
                                        <span className="w_top_no">
                                            01
                                        </span>
                                                <div className="w_top_song">
                                                    <div className="w_tp_song_img">
                                                        <img src="./images/weekly/song1.jpg" alt="" className="img-fluid"/>
                                                        <div className="ms_song_overlay">
                                                        </div>
                                                        <div className="ms_play_icon">
                                                            <img src="./images/svg/play.svg" alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="w_tp_song_name">
                                                        <h3><a href="#">Until I Met You</a></h3>
                                                        <p>Ava Cornish</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="weekly_right">
                                                <span className="w_song_time">5:10</span>
                                                <span className="ms_more_icon" data-other="1">
                                            <img src="./images/svg/more.svg" alt=""/>
                                        </span>
                                            </div>
                                            <ul className="more_option">
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_fav"/></span>Add To Favourites</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_queue"/></span>Add To Queue</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_playlst"/></span>Add To Playlist</a></li>
                                            </ul>
                                        </div>
                                        <div className="ms_divider"/>
                                        <div className="ms_weekly_box">
                                            <div className="weekly_left">
                                        <span className="w_top_no">
                                            02
                                        </span>
                                                <div className="w_top_song">
                                                    <div className="w_tp_song_img">
                                                        <img src="./images/weekly/song2.jpg" alt="" className="img-fluid"/>
                                                        <div className="ms_song_overlay">
                                                        </div>
                                                        <div className="ms_play_icon">
                                                            <img src="./images/svg/play.svg" alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="w_tp_song_name">
                                                        <h3><a href="#">Walking Promises</a></h3>
                                                        <p>Ava Cornish</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="weekly_right">
                                                <span className="w_song_time">5:10</span>
                                                <span className="ms_more_icon" data-other="1">
                                            <img src="./images/svg/more.svg" alt=""/>
                                        </span>
                                            </div>
                                            <ul className="more_option">
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_fav"/></span>Add To Favourites</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_queue"/></span>Add To Queue</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_playlst"/></span>Add To Playlist</a></li>
                                            </ul>
                                        </div>
                                        <div className="ms_divider"/>
                                        <div className="ms_weekly_box">
                                            <div className="weekly_left">
                                        <span className="w_top_no">
                                            03
                                        </span>
                                                <div className="w_top_song">
                                                    <div className="w_tp_song_img">
                                                        <img src="./images/weekly/song3.jpg" alt="" className="img-fluid"/>
                                                        <div className="ms_song_overlay">
                                                        </div>
                                                        <div className="ms_play_icon">
                                                            <img src="./images/svg/play.svg" alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="w_tp_song_name">
                                                        <h3><a href="#">Gimme Some Courage</a></h3>
                                                        <p>Ava Cornish</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="weekly_right">
                                                <span className="w_song_time">5:10</span>
                                                <span className="ms_more_icon" data-other="1">
                                            <img src="./images/svg/more.svg" alt=""/>
                                        </span>
                                            </div>
                                            <ul className="more_option">
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_fav"/></span>Add To Favourites</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_queue"/></span>Add To Queue</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_playlst"/></span>Add To Playlist</a></li>
                                            </ul>
                                        </div>
                                        <div className="ms_divider"/>
                                        <div className="ms_weekly_box">
                                            <div className="weekly_left">
                                        <span className="w_top_no">
                                            04
                                        </span>
                                                <div className="w_top_song">
                                                    <div className="w_tp_song_img">
                                                        <img src="./images/weekly/song4.jpg" alt="" className="img-fluid"/>
                                                        <div className="ms_song_overlay">
                                                        </div>
                                                        <div className="ms_play_icon">
                                                            <img src="./images/svg/play.svg" alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="w_tp_song_name">
                                                        <h3><a href="#">Desired Games</a></h3>
                                                        <p>Ava Cornish</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="weekly_right">
                                                <span className="w_song_time">5:10</span>
                                                <span className="ms_more_icon" data-other="1">
                                            <img src="./images/svg/more.svg" alt=""/>
                                        </span>
                                            </div>
                                            <ul className="more_option">
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_fav"/></span>Add To Favourites</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_queue"/></span>Add To Queue</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_playlst"/></span>Add To Playlist</a></li>
                                            </ul>
                                        </div>
                                        <div className="ms_divider"/>
                                        <div className="ms_weekly_box">
                                            <div className="weekly_left">
                                                <span className="w_top_no">
                                                    05
                                                </span>
                                                <div className="w_top_song">
                                                    <div className="w_tp_song_img">
                                                        <img src="./images/weekly/song5.jpg" alt="" className="img-fluid"/>
                                                        <div className="ms_song_overlay">
                                                        </div>
                                                        <div className="ms_play_icon">
                                                            <img src="./images/svg/play.svg" alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="w_tp_song_name">
                                                        <h3><a href="#">Dark Alley Acoustic</a></h3>
                                                        <p>Ava Cornish</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="weekly_right">
                                                <span className="w_song_time">5:10</span>
                                                <span className="ms_more_icon" data-other="1">
                                                    <img src="./images/svg/more.svg" alt=""/>
                                                </span>
                                            </div>
                                            <ul className="more_option">
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_fav"/></span>Add To Favourites</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_queue"/></span>Add To Queue</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_playlst"/></span>Add To Playlist</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-12">
                                        <div className="ms_weekly_box">
                                            <div className="weekly_left">
                                                <span className="w_top_no">
                                                    11
                                                </span>
                                                <div className="w_top_song">
                                                    <div className="w_tp_song_img">
                                                        <img src="./images/weekly/song2.jpg" alt="" className="img-fluid"/>
                                                        <div className="ms_song_overlay">
                                                        </div>
                                                        <div className="ms_play_icon">
                                                            <img src="./images/svg/play.svg" alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="w_tp_song_name">
                                                        <h3><a href="#">Dark Alley Acoustic</a></h3>
                                                        <p>Ava Cornish</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="weekly_right">
                                                <span className="w_song_time">5:10</span>
                                                <span className="ms_more_icon" data-other="1">
                                                    <img src="./images/svg/more.svg" alt=""/>
                                                </span>
                                            </div>
                                            <ul className="more_option">
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_fav"/></span>Add To Favourites</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_queue"/></span>Add To Queue</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_playlst"/></span>Add To Playlist</a></li>
                                            </ul>
                                        </div>
                                        <div className="ms_divider"/>
                                        <div className="ms_weekly_box">
                                            <div className="weekly_left">
                                                <span className="w_top_no">
                                                    12
                                                </span>
                                                <div className="w_top_song">
                                                    <div className="w_tp_song_img">
                                                        <img src="./images/weekly/song11.jpg" alt="" className="img-fluid"/>
                                                        <div className="ms_song_overlay">
                                                        </div>
                                                        <div className="ms_play_icon">
                                                            <img src="./images/svg/play.svg" alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="w_tp_song_name">
                                                        <h3><a href="#">The Heartbeat Stops</a></h3>
                                                        <p>Ava Cornish</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="weekly_right">
                                                <span className="w_song_time">5:10</span>
                                                <span className="ms_more_icon" data-other="1">
                                                    <img src="./images/svg/more.svg" alt=""/>
                                                </span>
                                            </div>
                                            <ul className="more_option">
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_fav"/></span>Add To Favourites</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_queue"/></span>Add To Queue</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_playlst"/></span>Add To Playlist</a></li>
                                            </ul>
                                        </div>
                                        <div className="ms_divider"/>
                                        <div className="ms_weekly_box">
                                            <div className="weekly_left">
                                                <span className="w_top_no">
                                                    13
                                                </span>
                                                <div className="w_top_song">
                                                    <div className="w_tp_song_img">
                                                        <img src="./images/weekly/song12.jpg" alt="" className="img-fluid"/>
                                                        <div className="ms_song_overlay">
                                                        </div>
                                                        <div className="ms_play_icon">
                                                            <img src="./images/svg/play.svg" alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="w_tp_song_name">
                                                        <h3><a href="#">One More Stranger</a></h3>
                                                        <p>Ava Cornish</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="weekly_right">
                                                <span className="w_song_time">5:10</span>
                                                <span className="ms_more_icon" data-other="1">
                                                    <img src="./images/svg/more.svg" alt=""/>
                                                </span>
                                            </div>
                                            <ul className="more_option">
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_fav"/></span>Add To Favourites</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_queue"/></span>Add To Queue</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_playlst"/></span>Add To Playlist</a></li>
                                            </ul>
                                        </div>
                                        <div className="ms_divider"/>
                                        <div className="ms_weekly_box">
                                            <div className="weekly_left">
                                                <span className="w_top_no">
                                                    14
                                                </span>
                                                <div className="w_top_song">
                                                    <div className="w_tp_song_img">
                                                        <img src="./images/weekly/song13.jpg" alt="" className="img-fluid"/>
                                                        <div className="ms_song_overlay">
                                                        </div>
                                                        <div className="ms_play_icon">
                                                            <img src="./images/svg/play.svg" alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="w_tp_song_name">
                                                        <h3><a href="#">Walking Promises</a></h3>
                                                        <p>Ava Cornish</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="weekly_right">
                                                <span className="w_song_time">5:10</span>
                                                <span className="ms_more_icon" data-other="1">
                                                    <img src="./images/svg/more.svg" alt=""/>
                                                </span>
                                            </div>
                                            <ul className="more_option">
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_fav"/></span>Add To Favourites</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_queue"/></span>Add To Queue</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_playlst"/></span>Add To Playlist</a></li>
                                            </ul>
                                        </div>
                                        <div className="ms_divider"/>
                                        <div className="ms_weekly_box">
                                            <div className="weekly_left">
                                                <span className="w_top_no">
                                                    15
                                                </span>
                                                <div className="w_top_song">
                                                    <div className="w_tp_song_img">
                                                        <img src="./images/weekly/song14.jpg" alt="" className="img-fluid"/>
                                                        <div className="ms_song_overlay">
                                                        </div>
                                                        <div className="ms_play_icon">
                                                            <img src="./images/svg/play.svg" alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="w_tp_song_name">
                                                        <h3><a href="#">Endless Things</a></h3>
                                                        <p>Ava Cornish</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="weekly_right">
                                                <span className="w_song_time">5:10</span>
                                                <span className="ms_more_icon" data-other="1">
                                                    <img src="./images/svg/more.svg" alt=""/>
                                                </span>
                                            </div>
                                            <ul className="more_option">
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_fav"/></span>Add To Favourites</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_queue"/></span>Add To Queue</a></li>
                                                <li><a href="#"><span className="opt_icon"><span
                                                    className="icon icon_playlst"/></span>Add To Playlist</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ms_footer_wrapper">
                        <div className="ms_footer_logo">
                            <a href="./index.html"><img src="./images/open_logo.png" alt=""/></a>
                        </div>
                        <div className="ms_footer_inner">
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
                                    <div className="footer_box">
                                        <h1 className="footer_title">miraculous music station</h1>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                                            duis aute irure dolor.</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="footer_box footer_contacts">
                                        <h1 className="footer_title">contact us</h1>
                                        <ul className="foo_con_info">
                                            <li>
                                                <div className="foo_con_icon">
                                                    <img src="./images/svg/message.svg" alt=""/>
                                                </div>
                                                <div className="foo_con_data">
                                                    <span className="con-title">email us :</span>
                                                    <span><a href="#">demo@mail.com </a>, <a
                                                        href="#">dummy@mail.com</a></span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="ms_copyright">
                                <div className="footer_border"/>
                                <p>Copyright &copy; 2018 <a href="#">The Miraculous Music Template</a>. All Rights Reserved.
                                </p>
                            </div>
                        </div>
                        <AudioPlayerBar music={this.state.selectedTreck}/>
                    </div>
                    <RegisterModal/>
                    <LoginModal/>
                </div>
                <div className="ms_clear_modal">
                    <div id="clear_modal" className="modal  centered-modal" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <button type="button" className="close" data-dismiss="modal">
                                    <i className="fa_icon form_close"/>
                                </button>
                                <div className="modal-body">
                                    <h1>Are you sure you want to clear your queue?</h1>
                                    <div className="clr_modal_btn">
                                        <a href="#">clear all</a>
                                        <a href="#">cancel</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ms_save_modal">
                    <div id="save_modal" className="modal  centered-modal" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <button type="button" className="close" data-dismiss="modal">
                                    <i className="fa_icon form_close"/>
                                </button>
                                <div className="modal-body">
                                    <h1>Log in to start sharing your music!</h1>
                                    <div className="save_modal_btn">
                                        <a href="#"><i className="fa fa-google-plus-square"
                                                       aria-hidden="true"/> continue with google </a>
                                        <a href="#"><i className="fa fa-facebook-square"
                                                       aria-hidden="true"/> continue with facebook</a>
                                    </div>
                                    <div className="ms_save_email">
                                        <h3>or use your email</h3>
                                        <div className="save_input_group">
                                            <input type="text" placeholder="Enter Your Name" className="form-control"/>
                                        </div>
                                        <div className="save_input_group">
                                            <input type="password" placeholder="Enter Password"
                                                   className="form-control"/>
                                        </div>
                                        <button className="save_btn">Log in</button>
                                    </div>
                                    <div className="ms_dnt_have">
                                        <span>Dont't have an account ?</span>
                                        <a href="javascript:" className="hideCurrentModel" data-toggle="modal"
                                           data-target="#myModal">Register Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}