import React, { Component } from 'react';
import MusicControls from './MusicControls.jsx';
import MusicProgress from './MusicProgress.jsx';

export default class TypePlayList extends Component {

    render() {

        return (
            <div className={this.props.className}>
                <div className="jp-gui jp-interface flex-wrap">
                    <MusicControls
                        className="jp-controls flex-item"
                        onPlayPause={this.props.onPlayPause}
                        onNext={this.props.onNext}
                        onPrevious={this.props.onPrevious}
                        paused={this.props.paused}
                    />
                    <MusicProgress currentTime={this.props.currentTime}
                                   duration={this.props.duration}
                                   onTimeChange={this.props.onTimeChange}
                                   className="jp-progress-container flex-item"/>
                </div>
            </div>
        );
    };

}