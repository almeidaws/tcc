import React from 'react';

const VolumeControl = props => (
    <div className={props.className}>
        <div className="widget knob-container">
            <div className="knob-wrapper-outer">
                <div className="knob-wrapper">
                    <div className="knob-mask">
                        <div className="knob d3"><span></span></div>
                        <div className="handle"></div>
                            <div className="round">
                                <img src="images/svg/volume.svg" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)

export default VolumeControl;