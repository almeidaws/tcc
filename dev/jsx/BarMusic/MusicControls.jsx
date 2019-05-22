import React from 'react';
import Button from '../Button.jsx';

const MusicControls = props => (
    <div className={props.className}>
     <Button className="jp-previous" onClick={props.onPrevious}/>
     <Button className="jp-play" onClick={props.onPlayPause}/>
     <Button className="jp-next" onClick={props.onNext}/>
    </div>
);
export default MusicControls;