import React from 'react';
import AudioPlayerBar from './BarMusic/AudioPlayerBar.jsx';

const Footer = props => {
    return (
            <div className="ms_footer_wrapper">
                <div className="ms_footer_logo">
                    <a href="./index.html"><img src="./images/open_logo.png" alt=""/></a>
                </div>
                <div className="col-lg-12">
                    <div className="ms_copyright">
                        <div className="footer_border"/>
                        <p>Copyright &copy; 2018 <a href="#">The Miraculous Music Template</a>. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        )
};

export default Footer
