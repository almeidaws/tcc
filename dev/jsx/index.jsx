import ReactDOM from 'react-dom';
import UploadForm from './Upload/UploadForm.jsx';
import App from "../../App.jsx";

const index = document.getElementById('index');
if (index)
    ReactDOM.render(<App container="index" />, index);

const favourites = document.getElementById('favourites');
if (favourites)
    ReactDOM.render(<App container="favourites" />, favourites);

const uploadForm = document.getElementById('uploadForm');
if ( uploadForm !== null)
    ReactDOM.render(<UploadForm container="uploadForm"/>, uploadForm);

const genre_single = document.getElementById('GenreSingle');
if ( genre_single !== null)
    ReactDOM.render(<App container="GenreSingle"/>, genre_single);

