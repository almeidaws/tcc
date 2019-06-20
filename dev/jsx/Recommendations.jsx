import React, { Component } from 'react';
import R from '../js/Requisition.js';
import MusicItemWeekly from './WeeklyTopMusic/MusicItemWeekly.jsx';

export default class Recommendations extends Component {
    constructor() {
        super();
        this.state = { musics: [] };
        this.getMusics();
    }

    getMusics() {
        R.getRecommendedMusics ((musics) => {
            this.setState({ musics });
        },(statusCode) => {
            console.log('Error when request recommended musics.');
            //DOES NOTHING
        });
    }

    render() {
        return (
            <div className="ms_weekly_wrapper">
                <div className="ms_weekly_inner">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ms_heading">
                                {this.state.musics.length === 0 ?
                                    <h1>Please login and favorite some musics to view recommendations for you</h1> :
                                    <h1>Recommendations for you</h1>}
                            </div>
                        </div>
                        {this.state.musics.map((music,index) => {
                            return <MusicItemWeekly paused={this.props.pausedMusic.music ? music.id !== this.props.pausedMusic.music.id : true}
                                                    music={music}
                                                    key={index}
                                                    count={index+1}
                                                    onPlayPause={this.props.onPlayPause}
                                                    changeFavorite={this.props.changeFavorite}/>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}