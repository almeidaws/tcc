import React from 'react';

const TextField = props => <input 
                                type="name"
                                placeholder={props.placeholder}
                                required={true}
                                value={props.value}
                                onChange={props.onChange}
                                />

class FormUpload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {trackName: '',artistName: ''};
        this.handleTrackName = this.handleTrackName.bind(this);
        this.handleArtistName = this.handleArtistName.bind(this);
    }
    handleTrackName(event) {
        this.setState({trackName: event.target.value,error: null});
    }
    handleArtistName(event) {
        this.setState({artistName: event.target.value,error: null});
    }
    validateForm() {
        const form = document.getElementById('uploadData');
        form.classNameList.add('was-validated');
        return form.checkValidity();
    }

    render() {
        return (
            <div className="ms_upload_box">
                <div className="ms_heading">
                    <h1>Track Information</h1>
                </div>
                <div className="ms_pro_form">
                    <div className="form-group">
                        <label>Track Name *</label>
                        <div>
                            <TextField value={this.state.trackName} placeholder="Dream Your Moments" onChange={this.handleTrackName}/>
                        </div>
                        <label>Artist’s Name *</label>
                        <div>
                            <TextField value={this.state.artistName} placeholder="Ava Cornish, Brian Hill" onChange={this.handleArtistName}/>
                        </div>
                        <div className="form-group">
                            <label>Select Genre</label>
                            <select className="form-control">
                                <option>Cloud Nine</option>
                                <option value="1">Cyber Sonnet </option>
                                <option value="2">Cloud Nine</option>
                                <option value="3">Cyber Sonnet</option>
                                <option value="4">Cloud Nine</option>
                            </select>
                        </div>
                        <div className="form-group">
                                <label>Select Privacy</label>
                                <select className="form-control">
                                <option>Public</option>
                                <option value="1">Private</option>
                                <option value="2">Public</option>
                                <option value="3">Private</option>
                                <option value="4">Public</option>
                            </select>
                        </div>
                    </div>
                    <div className="pro-form-btn text-center marger_top15">
                        <div className="ms_upload_btn">
                            <a href="#" className="ms_btn">Upload Now</a>
                            <a href="#" className="ms_btn">cancle</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class FormUploadBox extends React.Component {
        render() {
        return(
            <div className=" marger_top60">
                <FormUpload/>
            </div>
        );
    }
};

export default FormUploadBox;