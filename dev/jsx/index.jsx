import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import LoginModal from './LoginModal.jsx';
import RegisterModal from './RegisterModal.jsx';
import AudioPlayerBar from './BarMusic/AudioPlayerBar.jsx';
import UploadForm from './Upload/UploadForm.jsx';
import RecentlyPlayedMusic from './RecentlyPlayed/RecentlyPlayedMusic.jsx';

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<LoginModal />, document.getElementById('loginModal'));
ReactDOM.render(<RegisterModal/>, document.getElementById('registerModal'));
ReactDOM.render(<AudioPlayerBar/>, document.getElementById('audioPlayerBar'));
const uploadForm = document.getElementById('uploadForm');
if ( uploadForm !== null) {
    ReactDOM.render(<UploadForm/>, uploadForm);
}
ReactDOM.render(<RecentlyPlayedMusic/>,document.getElementById('recentlyPlayedMusic'));


