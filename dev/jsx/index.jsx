import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import LoginModal from './LoginModal.jsx';
import RegisterModal from './RegisterModal.jsx';
import AudioPlayerBar from './BarMusic/AudioPlayerBar.jsx';
import UploadBox from './UploadPage/UploadBox.jsx';
import FormUploadBox from './UploadPage/FormUploadBox.jsx';
import Loader from "./Load/Loader.jsx";
import RecentlyPlayedMusic from "./Music/RecentlyPlayedMusic.jsx";

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<LoginModal />, document.getElementById('loginModal'));
ReactDOM.render(<RegisterModal/>, document.getElementById('registerModal'));
ReactDOM.render(<AudioPlayerBar/>, document.getElementById('audioPlayerBar'));
ReactDOM.render(<UploadBox/>, document.getElementById('uploadMusicBox'));
ReactDOM.render(<FormUploadBox/>, document.getElementById('formUploadBox'));
ReactDOM.render(<Loader/>, document.getElementById('loader'));
ReactDOM.render(<RecentlyPlayedMusic/>, document.getElementById('recentlyPlayedMusic'));