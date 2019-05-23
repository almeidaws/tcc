import ReactDOM from 'react-dom';
import UploadForm from './Upload/UploadForm.jsx';
import App from "../../App.jsx";
import Favourites from "./Favourites/Favourites.jsx";
import RecentlyPlayedMusic from "./RecentlyPlayed/RecentlyPlayedMusic.jsx";
import Header from './Header.jsx';

const index = document.getElementById('index');
if (index)
    ReactDOM.render(<App container="index" />, index);

const uploadForm = document.getElementById('uploadForm');
if ( uploadForm !== null)
    ReactDOM.render(<UploadForm/>, uploadForm);

const favourites = document.getElementById('favourites');
if (favourites)
    ReactDOM.render(<Favourites />, favourites);

const recentlyPlayed = document.getElementById('recentlyPlayed');
if (recentlyPlayed)
    ReactDOM.render(<RecentlyPlayedMusic musics={[{id: 1, name: "Do seu lado", authors: [{id:1, name: "Paulo"}]}]}/>, recentlyPlayed);

const header = document.getElementById('header');
if (header)
    ReactDOM.render(<Header />, header);
