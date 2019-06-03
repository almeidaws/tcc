import React, { Component } from 'react';
import Music from '../Music.jsx';

const RecentlyPlayedMusic = props => {

    if (!props.musics) return null;
    if (props.musics.length === 0) return null;

    const musics = [];
    props.musics.map(music => {
        musics.push(<Music key={music.id}
                           paused={props.pausedMusic.music ? music.id !== props.pausedMusic.music.id : true}
                           music={music}
                           onPlayPause={props.onPlayPause}
                           changeFavorite={props.changeFavorite} />
       );
    });

    return(
        <div className="ms_weekly_wrapper">
            <div className="ms_rcnt_slider">
                <div className="ms_heading">
                    <h1>{props.title}</h1>
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
};
export default RecentlyPlayedMusic;
