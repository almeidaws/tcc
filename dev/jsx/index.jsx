import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import LoginModal from './LoginModal.jsx';
import RegisterModal from './RegisterModal.jsx';
import AudioPlayerBar from './BarMusic/AudioPlayerBar.jsx';
import UploadForm from './Upload/UploadForm.jsx';


ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<LoginModal />, document.getElementById('loginModal'));
ReactDOM.render(<RegisterModal/>, document.getElementById('registerModal'));
ReactDOM.render(<AudioPlayerBar/>, document.getElementById('audioPlayerBar'));
ReactDOM.render(<UploadForm/>, document.getElementById('uploadForm'));