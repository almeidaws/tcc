import ReactDOM from 'react-dom';
import UploadForm from './Upload/UploadForm.jsx';
import App from "../../App.jsx";
import Genre_Single from './Genre_Single.jsx';

const index = document.getElementById('index');
if (index)
    ReactDOM.render(<App container="index" />, index);

const favourites = document.getElementById('favourites');
if (favourites)
    ReactDOM.render(<App container="favourites" />, favourites);

const uploadForm = document.getElementById('uploadForm');
if ( uploadForm !== null)
    ReactDOM.render(<UploadForm/>, uploadForm);

const genre_single = document.getElementById('Genre_Single');
if ( genre_single !== null)
    ReactDOM.render(<Genre_Single/>, genre_single);
