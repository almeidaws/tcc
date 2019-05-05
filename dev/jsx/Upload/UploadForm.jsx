import React from 'react';
import R from '../../js/Requisition.js';

const Select = props => (
    <div className="form-group">
        <label>{props.title}</label>
        <select className="form-control" onChange={props.onChange} >
        { props.allowNoSelection ? <option key={-1} value={-1}>{props.noSelectionValue}</option> : null }
        { props.options.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
    </select>
    </div>
);

const InputText = props => {
    const randomNumber = Math.abs(parseInt(Math.random() * 100000));
    return (
        <div className="form-group">
            <label>{props.title}</label>
            <input id={props.id}
                   type="text" 
                   list={"datalist-" + randomNumber}
                   name={props.name}
                   placeholder={props.placeHolder} 
                   onChange={props.onChange} 
                   value={props.value} 
                   className={"form-control " + props.classes} />
            <datalist id={"datalist-" + randomNumber}>
                { props.datalist ? props.datalist.map(item => <option key={item.id}>{item.name}</option>) : null }
            </datalist>
        </div>
    );
};

const TrackInformation = props => {
    if (props.rendered === false) return null;
    return (
        <div className="ms_pro_form">
            <InputText title="Track Name *" 
                       placeHolder="Dream Your Moments" 
                       onChange={props.onTrackNameChange} 
                       value={props.trackName} />
            <InputText title="Artist’s Name *" 
                       datalist={props.authors}
                       id="authors"
                       classes="awesomplete"
                       placeHolder="Ava Cornish, Brian Hill"
                       onChange={props.onArtistNameChange}
                       value={props.artistName} />
            <Select title="Primary Genre *" 
                    options={props.genres} 
                    onChange={props.onPrimaryGenreChange} />
            <Select title="Secondary Genre" 
                    allowNoSelection={true} 
                    noSelectionValue="No genre"
                    options={props.genres} 
                    onChange={props.onSecondaryGenreChange} />
            <div className="pro-form-btn text-center marger_top15">
                <div className="ms_upload_btn">
                    <a href="javascript:;" className="ms_btn" onClick={props.onUpload} >Upload Now</a>
                </div>
            </div>
        </div>
    );
};

const ErrorMessages = props => {
    if (!props.messages || props.messages.length === 0) return null;
    return props.messages.map((message, index) => {
            return (<div key={index} 
                        className="my-5 alert alert-danger w-75 centered border-radius" 
                        role="alert">{message}</div>);
        });
};

const Upload = props => (
    <div className="ms_upload_box">
        <div className="ms_heading">
            <h2>Upload & Share Your Music With The World</h2>
        </div>
        <ErrorMessages messages={props.errorMessages} />
        <div className="file-upload w-75">
          <div className="file-select">
            <div className="file-select-button" id="fileName">Choose File</div>
            <div className="file-select-name" id="noFile">{props.fileName ? props.fileName : "No file chosen..."}</div> 
            <input onChange={props.onMusicFileChange} type="file" name="music" accept="audio/*" id="chooseFile" />
          </div>
        </div>
    </div>
);

const Loader = props => {
    if (props.rendered === false) return null;
    return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>;
};

class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { trackName: "",
                       artistName: "",
                       primaryGenre: null, 
                       secondaryGenre: null,
                       musicFile: null,
                       authors: null,
                       genres: null,
                       errorMessages: [],
                       fileErrorMessages: [],
                       fileName: null,
                     };

        this.handleTrackName = this.handleTrackName.bind(this);
        this.handleArtistName = this.handleArtistName.bind(this);
        this.handlePrimaryGenre = this.handlePrimaryGenre.bind(this);
        this.handleSecondaryGenre = this.handleSecondaryGenre.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleMusicFile = this.handleMusicFile.bind(this);

        this.fetchAuthorsAndGenres();
    }
    handleUpload() {
        // This test is done this way to avoid short-circuit.
        // Each test also shows an error message to the user.
        this.setState({ errorMessages: [], fileErrorMessages: [] });
        const trackNameValid = this.isTrackNameValid();
        const artistNameValid = this.isArtistNameValid();
        const musicFileValid = this.isMusicFileSelected();
        if (!trackNameValid || !artistNameValid || !musicFileValid) return;

    }
    isMusicFileSelected() {
        if (this.state.musicFile === null) {
            this.setState(prevState => {
                const errorMessages = prevState.fileErrorMessages;
                errorMessages.push(`You must add a music file`);
                return { fileErrorMessages: errorMessages }
            });
            return false;
         }
         return true;
    }
    selectedArtist() {
        const artists = this.state.authors.filter(author => author.name === this.state.artistName);
        if (artists.length === 1) return artists[0].id;

        const artist = this.state.artistName.trim();
        if (artist.length === 0) return null;

        return artist
    }    
    isArtistNameValid() {
        const artist = this.selectedArtist();
        if (artist === null) {
            this.setState(prevState => {
                const errorMessages = prevState.errorMessages;
                errorMessages.push(`You must add an artist name`);
                return { errorMessages }
            });
            return false;
         }

         if (typeof artist === 'string' && artist.length < 3) {
            this.setState(prevState => {
                const errorMessages = prevState.errorMessages;
                errorMessages.push(`Artist name too short`);
                return { errorMessages }
            });
            return false;
         }
         return true;
    }
    isTrackNameValid() {
        const track = this.state.trackName.trim();
        if (track.length < 3) {
            this.setState(prevState => {
                const errorMessages = prevState.errorMessages;
                errorMessages.push(`Track name must have at least 3 characters`);
                return { errorMessages }
            });
            return false;
         }
         return true;
    }
    fetchAuthorsAndGenres() {
        this.fetchAuthors();
        this.fetchGenres();
    }
    fetchAuthors() {
        R.allAuthors(authors => {
            this.setState({ authors });
            $("#authors").ready(() => {
            });
        }, errorStatus => {
            this.setState(prevState => {
                const errorMessages = prevState.errorMessages;
                errorMessages.push(`Error ${errorStatus} when loading authors`);
                return { errorMessages }
            });
        });
    }
    fetchGenres() {
        R.allGenres(genres => {
            this.setState({ genres });
        }, errorStatus => {
            this.setState(prevState => {
                const errorMessages = prevState.errorMessages;
                errorMessages.push(`Error ${errorStatus} when loading genres`);
                return { errorMessages }
            });
        });
    }
    handleMusicFile(event) {
        const file = event.target.files[0];
        this.setState({ fileName: file.name, musicFile: file });
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
                    <Upload errorMessages={this.state.fileErrorMessages} 
                            fileName={this.state.fileName}
                            onMusicFileChange={this.handleMusicFile} />
                    <div className="marger_top60">
                        <div className="ms_upload_box">
                            <div className="ms_heading">
                                <h1>Track Information</h1>
                            </div>
                            <Loader rendered={(this.state.authors === null || 
                                              this.state.genres === null) && 
                                              this.state.errorMessages.length === 0} />
                            <ErrorMessages messages={this.state.errorMessages} />
                            <TrackInformation rendered={this.state.authors !== null && this.state.genres !== null}
                                              trackName={this.state.trackName} 
                                              onTrackNameChange={this.handleTrackName}
                                              authors={this.state.authors}
                                              artistName={this.state.artistName}
                                              onArtistNameChange={this.handleArtistName}
                                              genres={this.state.genres}
                                              onPrimaryGenreChange={this.handlePrimaryGenre} 
                                              onSecondaryGenreChange={this.handleSecondaryGenre}
                                              onUpload={this.handleUpload} />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default UploadForm;
