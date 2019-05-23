import React, { Component } from 'react';
import Music from '../Music.jsx';

export default class RecentlyPlayedMusic extends Component {

    render() {
        if (!this.props.musics) return null;
        if (this.props.musics.length === 0) return null;

        const musics = [];
        this.props.musics.map(music => {
            musics.push(<Music play={this.props.play} key={music.id} music={music} musicArtist={'Renan Alves'}/>);
        });

        return(
            <div className="ms_weekly_wrapper">
                <div className="ms_rcnt_slider">
                    <div className="ms_heading">
                        <h1>Recently Played</h1>
                        <span className="view_all"><a href="#">view more</a></span>
                    </div>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {musics}
                        </div>
                    </div>
                    <div className="swiper-button-next slider_nav_next"></div>
                    <div className="swiper-button-prev slider_nav_prev"></div>
                </div>
            </div>
        );
    }

}
