import React from 'react';
import Header from '../Header.jsx';
import RecentlyPlayedMusic from '../RecentlyPlayed/RecentlyPlayedMusic.jsx';
import Recommendations from '../Recommendations.jsx';

const Index = props => {

    return (
        <div className="ms_content_wrapper padder_top80">
            <Header />
            <RecentlyPlayedMusic
                title={'Recently Played'}
                pausedMusic={props.pausedMusic}
                musics={props.musics} 
                onPlayPause={props.onPlayPause}
                changeFavorite={props.changeFavorite}/>
            <Recommendations
                pausedMusic={props.pausedMusic}
                onPlayPause={props.onPlayPause}
                changeFavorite={props.changeFavorite}/>
        </div>
    )
};

export default Index;
