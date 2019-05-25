import ReactDOM from 'react-dom';
import UploadForm from './Upload/UploadForm.jsx';
import App from "../../App.jsx";
import Genre_Single from './GenreSingle.jsx';

const index = document.getElementById('index');
if (index)
    ReactDOM.render(<App container="index" />, index);

const favourites = document.getElementById('favourites');
if (favourites)
    ReactDOM.render(<App container="favourites" />, favourites);

const uploadForm = document.getElementById('uploadForm');
if ( uploadForm !== null)
<<<<<<< HEAD
    ReactDOM.render(<UploadForm/>, uploadForm);

const genre_single = document.getElementById('GenreSingle');
if ( genre_single !== null)
    ReactDOM.render(<App container="GenreSingle"/>, genre_single);
=======
    ReactDOM.render(<App container="uploadForm" />, uploadForm);
>>>>>>> ec3362978b6afd9d50d2023ecb23755c556449f4
