import React from 'react';
import AudioPlayerBar from './BarMusic/AudioPlayerBar.jsx';

const Footer = props => {
    console.log(props);
    return (
            <div className="ms_footer_wrapper">
                <div className="ms_footer_logo">
                    <a href="./index.html"><img src="./images/open_logo.png" alt=""/></a>
                </div>
                <div className="ms_footer_inner">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer_box">
                                <h1 className="footer_title">miraculous music station</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                                    duis aute irure dolor.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer_box footer_contacts">
                                <h1 className="footer_title">contact us</h1>
                                <ul className="foo_con_info">
                                    <li>
                                        <div className="foo_con_icon">
                                            <img src="./images/svg/message.svg" alt=""/>
                                        </div>
                                        <div className="foo_con_data">
                                            <span className="con-title">email us :</span>
                                            <span><a href="#">demo@mail.com </a>, <a
                                                href="#">dummy@mail.com</a></span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="ms_copyright">
                        <div className="footer_border"/>
                        <p>Copyright &copy; 2018 <a href="#">The Miraculous Music Template</a>. All Rights Reserved.
                        </p>
                    </div>
                </div>
                <AudioPlayerBar
                    currentTime={props.currentTime}
                    duration={props.duration}
                    onTimeChange={props.onTimeChange}
                    onNext={props.onNext}
                    onPrevious={props.onPrevious}
                    onPlayPause={props.onPlayPause}
                    paused={props.paused}
                />
            </div>
        )
};

export default Footer
