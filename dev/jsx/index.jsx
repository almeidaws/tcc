import ReactDOM from 'react-dom';
import UploadForm from './Upload/UploadForm.jsx';
import App from "../../App.jsx";
import Favourites from "./Favourites/Favourites.jsx";
import RecentlyPlayedMusic from "./RecentlyPlayed/RecentlyPlayedMusic.jsx";
import Header from './Header.jsx';

const app = document.getElementById('app');
if (app)
    ReactDOM.render(<App/>, app);

const uploadForm = document.getElementById('uploadForm');
if ( uploadForm !== null)
    ReactDOM.render(<UploadForm/>, uploadForm);

const favourites = document.getElementById('favourites');
if (favourites)
    ReactDOM.render(<Favourites />, favourites);

const recentlyPlayed = document.getElementById('recentlyPlayed');
if (recentlyPlayed)
    ReactDOM.render(<RecentlyPlayedMusic />, recentlyPlayed);

const header = document.getElementById('header');
if (header)
    ReactDOM.render(<Header />, header);
