import React from 'react';
import R from '../../js/Requisition.js';

const Title = props => {
    if (props.rendered === false) return null;
    return (
        <div className="ms_heading">
            <h1>{props.name}</h1>
        </div>
    );
};

const Select = props => (
    <div className="form-group">
        <label>{props.title}</label>
        <select className="form-control" onChange={props.onChange} >
        { props.allowNoSelection ? <option key={-1} value={-1}>{props.noSelectionValue}</option> : null }
        { props.options.map(option => <option key={option.id} value={option.name}>{option.name}</option>)}
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
        <Title name="Upload & Share Your Music With The World" />
        <ErrorMessages messages={props.errorMessages} />
        <div className="file-upload w-75 pb-5">
          <div className="file-select">
            <div className="file-select-button" id="fileName">Choose File</div>
            <div className="file-select-name" id="noFile">{props.fileName ? props.fileName : "No file chosen..."}</div> 
            <input onChange={props.onMusicFileChange} type="file" name="music" accept="audio/*" id="chooseFile" />
          </div>
        </div>

        <div className="file-upload w-75 pt-5">
          <div className="file-select">
            <div className="file-select-button" id="posterName">Choose Poster</div>
            <div className="file-select-name" id="noPoster">{props.posterName ? props.posterName : "No poster chosen..."}</div> 
            <input onChange={props.onMusicPosterChange} type="file" name="poster" accept="image/*" id="choosePoster" />
          </div>
        </div>
    </div>
);

const Loader = props => {
    if (props.rendered === false) return null;
    return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>;
};

const UploadingState = props => (
    <div className="marger_top60">
        <div className="ms_upload_box">
            <ErrorMessages messages={props.errorMessages} />
            <Title name="Uploaded successfully" rendered={props.errorMessages.length === 0} />
            <div className="pro-form-btn text-center marger_top15">
                <div className="ms_upload_btn">
                    <a href="javascript:;" className="ms_btn" onClick={() => document.location.reload(true)}>New music</a>
                </div>
            </div>
            <Loader rendered={props.uploadingFinished === true} />
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
                       musicFile: null,
                       posterFile: null,
                       authors: null,
                       genres: null,
                       errorMessages: [],
                       fileErrorMessages: [],
                       uploadingErrorMessages: [],
                       fileName: null,
                       posterName: null,
                       uploading: true,
                     };

        this.handleTrackName = this.handleTrackName.bind(this);
        this.handleArtistName = this.handleArtistName.bind(this);
        this.handlePrimaryGenre = this.handlePrimaryGenre.bind(this);
        this.handleSecondaryGenre = this.handleSecondaryGenre.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleMusicFile = this.handleMusicFile.bind(this);
        this.handleMusicPoster = this.handleMusicPoster.bind(this);

        this.fetchAuthorsAndGenres();
    }
    handleUpload() {
        // This test is done this way to avoid short-circuit.
        // Each test also shows an error message to the user.
        this.setState({ errorMessages: [], fileErrorMessages: [] });
        const trackNameValid = this.isTrackNameValid();
        const artistNameValid = this.isArtistNameValid();
        const musicFileValid = this.isMusicFileSelected();
        const musicPosterValid = this.isMusicPosterSelected();
        if (!trackNameValid || !artistNameValid || !musicFileValid || !musicPosterValid) return;

        // Send data to the requesition
        const trackName = this.state.trackName.trim();
        const artist = this.state.artistName;
        const primaryGenre = this.state.genres.filter(genre => genre.name === this.state.primaryGenre)[0];
        const secondaryGenre = this.state.genres.filter(genre => genre.name === this.state.secondaryGenre);
        const genres = [primaryGenre, secondaryGenre].map(genre => genre.id).filter(id => Number.isInteger(id));

        this.setState({ uploadStarted: true });
        R.addMusic(trackName, artist, genres, this.state.musicFile, this.state.posterFile, () => {
            this.setState({ uploadFinished: true });
        }, errorStatus => {
            const uploadingErrorMessages = [];
            if (errorStatus === 409)
                uploadingErrorMessages.push(`This music alredy exists`); 
            else
                uploadingErrorMessages.push(`Unknown error of code ${errorStatus}`);

            this.setState({ uploadingErrorMessages, uploadFinished: true });
        });
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
    isMusicPosterSelected() {
        if (this.state.posterFile === null) {
            this.setState(prevState => {
                const errorMessages = prevState.fileErrorMessages;
                errorMessages.push(`You must add a music poster`);
                return { fileErrorMessages: errorMessages }
            });
            return false;
         }
         return true;
    }
    isArtistNameValid() {
        const artist = this.state.artistName;
        if (artist === null) {
            this.setState(prevState => {
                const errorMessages = prevState.errorMessages;
                errorMessages.push(`You must add an artist name`);
                return { errorMessages }
            });
            return false;
         }

         if (artist.length < 3) {
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
            this.setState({ genres, primaryGenre: genres[0].name });
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
    handleMusicPoster(event) {
        const file = event.target.files[0];
        this.setState({ posterName: file.name, posterFile: file });
    }
    handleTrackName(event) {
        this.setState({ trackName: event.target.value });
    }
    handleArtistName(event) {
        this.setState({ artistName: event.target.value });
    }
    handlePrimaryGenre(event) {
        this.setState({ primaryGenre: event.target.value });
    }
    handleSecondaryGenre(event) {
        this.setState({ secondaryGenre: event.target.value });
    }
    render() {
        const fields = (
            <div>
                <Upload errorMessages={this.state.fileErrorMessages} 
                        fileName={this.state.fileName}
                        posterName={this.state.posterName}
                        onMusicFileChange={this.handleMusicFile}
                        onMusicPosterChange={this.handleMusicPoster} />
                <div className="marger_top60">
                    <div className="ms_upload_box">
                        <Title name="Track Information" />
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
        );
                
        return (
            <form>
                <div className="ms_upload_wrapper marger_top60">
                    { this.state.uploadStarted ? <UploadingState errorMessages={this.state.uploadingErrorMessages} 
                                                                 finished={this.state.uploadFinished} /> : fields } 
                </div>
            </form>
        );
    }
}

export default UploadForm;
