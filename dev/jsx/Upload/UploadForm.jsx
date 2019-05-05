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
        <div className="marger_top60">
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
                               datalist={props.authors}
                               id="authors"
                               classes="awesomplete"
                               placeHolder="Ava Cornish, Brian Hill"
                               onChange={props.onArtistNameChange}
                               value={props.artistName} />
                    <Select title="Primary Genre *" 
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
};

const ErrorMessages = props => {
    if (!props.messages || props.messages.length === 0) return null;
    return (
        <div className="marger_top60">
            <div className="ms_upload_box">
                <div className="ms_heading">
                    <h1>Track Information</h1>
                </div>
                { props.messages.map((message, index) => <div key={index} 
                                                              className="my-5 alert alert-danger w-75 centered border-radius" 
                                                              role="alert">{message}</div>) }
            </div>
        </div>
    );
};

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

const Loader = props => {
    if (props.rendered === false) return null;
    return (
        <div className="marger_top60">
            <div className="ms_upload_box">
                <div className="ms_heading">
                    <h1>Track Information</h1>
                </div>
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    );
};

class UploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { trackName: "",
                       artistName: "",
                       primaryGenre: null, 
                       secondaryGenre: null,
                       authors: null,
                       genres: null,
                       errorMessages: [],
                     };

        this.handleTrackName = this.handleTrackName.bind(this);
        this.handleArtistName = this.handleArtistName.bind(this);
        this.handlePrimaryGenre = this.handlePrimaryGenre.bind(this);
        this.handleSecondaryGenre = this.handleSecondaryGenre.bind(this);

        this.fetchAuthorsAndGenres();
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
                                      onSecondaryGenreChange={this.handleSecondaryGenre} />
                </div>
            </form>
        );
    }
}

export default UploadForm;
