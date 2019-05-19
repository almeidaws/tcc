import ReactDOM from 'react-dom';
import UploadForm from './Upload/UploadForm.jsx';
import App from "../../App.jsx";

ReactDOM.render(<App/>, document.getElementById('app'));
const uploadForm = document.getElementById('uploadForm');
if ( uploadForm !== null) {
    ReactDOM.render(<UploadForm/>, uploadForm);
}


