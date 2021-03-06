import React, { Component } from 'react';
import Header from './Header.jsx';
import RecentlyPlayedMusic from './RecentlyPlayed/RecentlyPlayedMusic.jsx';
import R from '../js/Requisition.js';

export default class GenreSingle extends Component {
    constructor(props) {
        super(props);
        this.state = { musics:  [], musicsByGenre: [], genres: [] };

        R.getAllMusics((musics) => {
            const indexedMusics = musics.map((music, index) => {
                music.index = index;
                return music;
            });

            this.setState({ musics: indexedMusics === undefined ? [] : indexedMusics});
            R.allGenres((genres) => {
                this.setState({ genres });
                this.separatorMusics();
            });
        });
    }

    separatorMusics() {
        if(this.state.musics.length === 0 || this.state.genres.length === 0) return;
        const musicsByGenre = [];
        for(let i=0;i<this.state.genres.length;i++) {
            const musics = [];
            this.state.musics.map((music) => {
                music.genres.map((genre) => {
                    if(genre.id === this.state.genres[i].id) {
                        musics.push(music);
                    }
                })
            });
            musicsByGenre.push({ genre: this.state.genres[i].name, musics: musics });
        }
        this.setState({ musicsByGenre });
    }

    render() {
        console.log('apos o separator, minha matriz é: ',this.state.musicsByGenre);
        return(
            <div className="ms_content_wrapper padder_top80">
                <Header/>
                {
                    this.state.musicsByGenre.map((musicByGenre) => {
                        return <RecentlyPlayedMusic key={musicByGenre.genre} 
                                                    onPlayPause={this.props.onPlayPause}
                                                    pausedMusic={this.props.pausedMusic}
                                                    musics={musicByGenre.musics}
                                                    title={musicByGenre.genre} />
                    })
                }
            </div>
        );
    }
};
