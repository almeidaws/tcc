import React, { Component } from 'react';


export default class Music extends Component {

    render() {
        return (
            <div className="swiper-slide">
                <div className="ms_rcnt_box">
                    <div className="ms_rcnt_box_img">
                        <img src="../../../prod/images/music/r_music1.jpg" alt=""/>
                            <div className="ms_main_overlay">
                                <div className="ms_box_overlay"></div>
                                <div className="ms_more_icon">
                                    <img src="../../../prod/images/svg/more.svg" alt=""/>
                                </div>
                                <ul className="more_option">
                                    <li><a href="#"><span className="opt_icon"><span
                                        className="icon icon_fav"/></span>Add To Favourites</a></li>
                                    <li><a href="#"><span className="opt_icon"><span className="icon icon_queue"/></span>Add
                                        To Queue</a></li>
                                    <li><a href="#"><span className="opt_icon"><span
                                        className="icon icon_playlst"/></span>Add To Playlist</a></li>
                                </ul>
                                <div className="ms_play_icon">
                                    <img src="../../../prod/images/svg/play.svg" alt=""/>
                                </div>
                            </div>
                    </div>
                    <div className="ms_rcnt_box_text">
                        <h3><a href="#">{this.props.musicName}</a></h3>
                        <p>{this.props.musicArtist}</p>
                    </div>
                </div>
            </div>
        );
    }
}