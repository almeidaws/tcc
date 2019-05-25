import React, { Component } from 'react';
import LeftMenu from './LeftMenu.jsx';
import Footer from './Footer.jsx';
import RecentlyPlayedMusic from './RecentlyPlayed/RecentlyPlayedMusic.jsx';
import R from '../js/Requisition.js';

export default class Genre_Single extends Component {
    constructor(props) {
        super(props);
        this.state = { allMusics:  null, musicsByGenre: [], genres: null };

        R.getAllMusics((musics) => {
            const indexedMusics = musics.map((music, index) => {
                music.index = index;
                return music;
            });

            this.setState({ allMusics: indexedMusics === undefined ? [] : musics});
            this.separatorMusics();
        });

        R.allGenres((genres) => {
            this.setState({ genres });
        });
    }

    separatorMusics() {
        if(this.state.musics === null || this.state.genres === null) return;

        for(i=0;i<this.state.genres.length;i++) {
            const musics = [];
            this.state.musics.map((music) => {
                music.genres.map((genre) => {
                    if(genre.id === this.state.genres[i].id) {
                        musics.push(music);
                    }
                })
            });
            this.state.musicsByGenre.push({ genre: this.state.genres[i].name, musics: musics });
        }
    }

    render() {
        return(
            <div>
                <div className="ms_main_wrapper">
                    <LeftMenu/>
                    <div className="ms_content_wrapper padder_top80">
                        <div id="header"></div>
                        {
                            this.state.musicsByGenre.map((musicByGenre) => {
                                <RecentlyPlayedMusic musics={musicByGenre.musics} title={musicByGenre.genre} />
                            })
                        }
                    </div>
                    <Footer/>
                    <div id="audioPlayerBar"/>
                </div>
                <div id="registerModal"></div>
                <div id="loginModal"></div> 
            </div>
        );
    }
};