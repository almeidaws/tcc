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
    ReactDOM.render(<App container="uploadForm" />, uploadForm);
