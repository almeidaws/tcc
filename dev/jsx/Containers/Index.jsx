import React from 'react';
import Header from '../Header.jsx';
import RecentlyPlayedMusic from '../RecentlyPlayed/RecentlyPlayedMusic.jsx';
import MusicItemWeekly from '../WeeklyTopMusic/MusicItemWeekly.jsx';

const Index = props => {

    return (
        <div className="ms_content_wrapper padder_top80">
            <Header />
            <RecentlyPlayedMusic
                title={'Recently Player'}
                pausedMusic={props.pausedMusic}
                musics={props.musics} 
                onPlayPause={props.onPlayPause}/>
            <div className="ms_weekly_wrapper">
                <div className="ms_weekly_inner">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ms_heading">
                                <h1>weekly top 15</h1>
                            </div>
                        </div>
                        {props.musics.map((music,index) => {
                            return <MusicItemWeekly paused={props.pausedMusic.music ? music.id !== props.pausedMusic.music.id : true}
                                                    music={music}
                                                    key={index}
                                                    count={index+1}
                                                    onPlayPause={props.onPlayPause}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Index;
