import React from 'react';

class UploadBox extends React.Component {
    render() {
        return(
            <div className="ms_upload_box">
                <h2>Upload and Share Your Music With The World</h2>
                <img src="images/svg/upload.svg" alt=""/>
                <div className="ms_upload_btn">
                    <a href="#" className="ms_btn">save files</a>
                </div>
                <span> or </span>
                <p>Drag And Drop Music Files</p>
            </div>
        );
    }
};

export default UploadBox;