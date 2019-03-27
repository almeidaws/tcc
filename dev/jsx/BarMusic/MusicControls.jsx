import React from 'react';
import Button from '../Button.jsx';

const MusicControls = props => (
    <div className={props.className}>
     <Button className="jp-previous"/>
     <Button className="jp-play"/>
     <Button className="jp-next"/>
    </div>
)
export default MusicControls;