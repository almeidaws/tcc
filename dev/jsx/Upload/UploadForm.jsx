import React from 'react';

const Select = props => (
    <div className="form-group">
        <label>{props.title}</label>
        <select className="form-control" onChange={props.onChange} >
        { props.allowNoSelection ? <option key={-1} value={-1}>{props.noSelectionValue}</option> : null }
        { props.options.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
    </select>
    </div>
);

const InputText = props => (
    <div className="form-group">
        <label>{props.title}</label>
        <input type="text" placeholder={props.placeHolder} onChange={props.onChange} value={props.value} className="form-control"/>
    </div>
);

const TrackInformation = props => (
    <div className=" marger_top60">
        <div className="ms_upload_box">
            <div className="ms_heading">
                <h1>Track Information</h1>
            </div>
            <div className="ms_pro_form">
                <InputText title="Track Name *" 
                           placeHolder="Dream Your Moments" 
                           onChange={props.onTrackNameChange} 
                           value={props.trackName} />
                <InputText title="Artist’s Name *" 
                           placeHolder="Ava Cornish, Brian Hill"
                           onChange={props.onArtistNameChange}
                           value={props.artistName} />
                <Select title="Primary Genre" 
                        allowNoSelection={true} 
                        noSelectionValue="No genre"
                        options={props.genres} 
                        onChange={props.onPrimaryGenreChange} />
                <Select title="Secondary Genre" 
                        allowNoSelection={true} 
                        noSelectionValue="No genre"
                        options={props.genres} 
                        onChange={props.onSecondaryGenreChange} />
                <div className="pro-form-btn text-center marger_top15">
                    <div className="ms_upload_btn">
                        <a href="#" className="ms_btn">Upload Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Upload = props => (
    <div className="ms_upload_box">
        <div className="ms_heading">
            <h2>Upload & Share Your Music With The World</h2>
        </div>
        <div className="file-upload w-75">
          <div className="file-select">
            <div className="file-select-button" id="fileName">Choose File</div>
            <div className="file-select-name" id="noFile">No file chosen...</div> 
            <input type="file" name="chooseFile" id="chooseFile" />
          </div>
        </div>
    </div>
);

class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { trackName: "",
                       artistName: "",
                       primaryGenre: null, 
                       secondaryGenre: null,
                       genres: [{ id: 0, name: "Rock" }, 
                                { id: 1, name: "Pop" } ]
                     };

        this.handleTrackName = this.handleTrackName.bind(this);
        this.handleArtistName = this.handleArtistName.bind(this);
        this.handlePrimaryGenre = this.handlePrimaryGenre.bind(this);
        this.handleSecondaryGenre = this.handleSecondaryGenre.bind(this);
    }
    handleTrackName(event) {
        this.setState({ trackName: event.target.value });
    }
    handleArtistName(event) {
        this.setState({ artistName: event.target.value });
    }
    handlePrimaryGenre(event) {
        const id = event.target.value === -1 ? null : event.target.value;
        this.setState({ primaryGenre: id });
    }
    handleSecondaryGenre(event) {
        const id = event.target.value === -1 ? null : event.target.value;
        this.setState({ secondaryGenre: id });
    }
    render() {
        return (
            <form>
                <div className="ms_upload_wrapper marger_top60">
                    <Upload />
                    <TrackInformation trackName={this.state.trackName} 
                                      onTrackNameChange={this.handleTrackName}
                                      artistName={this.state.artistName}
                                      onArtistNameChange={this.handleArtistName}
                                      genres={this.state.genres}
                                      onPrimaryGenreChange={this.handlePrimaryGenre} 
                                      onSecondaryGenreChange={this.handleSecondaryGenre} />
                </div>
            </form>
        );
    }
}

export default UploadForm;
