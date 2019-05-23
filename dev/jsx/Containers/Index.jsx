import React from 'react';
import Header from '../Header.jsx';
import RecentlyPlayedMusic from '../RecentlyPlayed/RecentlyPlayedMusic.jsx';

const Index = props => {
    return (
        <div className="ms_content_wrapper padder_top80">
            <Header />
            <RecentlyPlayedMusic 
                paused={props.paused} 
                musics={props.musics} 
                playPause={props.onPlayPauseMusic} 
                play={props.onPlay}/>
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
    )
};

export default Index;
