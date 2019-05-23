import React, {Component} from 'react';
import AudioPlayerBar from "./dev/jsx/BarMusic/AudioPlayerBar.jsx";
import RegisterModal from "./dev/jsx/RegisterModal.jsx";
import LoginModal from "./dev/jsx/LoginModal.jsx";
import Footer from "./dev/jsx/Footer.jsx";
import Index from "./dev/jsx/Containers/Index.jsx";
import LeftMenu from "./dev/jsx/LeftMenu.jsx";
import R from "./dev/js/Requisition";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            musics: [],
            currentMusicTime: 0.0,
            currentMusicDuration: 0.0,
            currentAudio: null,
            currentMusic: null,
        };

        R.getAllMusics((musics) => {
            const indexedMusics = musics.map((music, index) => {
                music.index = index;
                return music;
            });

            this.setState({musics: indexedMusics === undefined ? [] : musics});
        });

        this.onTimeChange = this.onTimeChange.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.onAudioLoaded = this.onAudioLoaded.bind(this);
        this.onAudioTimeChange = this.onAudioTimeChange.bind(this);
        this.onPlayPauseMusic = this.onPlayPauseMusic.bind(this);
        this.onNextMusic = this.onNextMusic.bind(this);
        this.onPreviousMusic = this.onPreviousMusic.bind(this);
    }

    onTimeChange() {
        const bullet = document.getElementById("progress");
        const bar = document.getElementById("progress-bar");
        if (!bullet || !bar) return;

        const currentWidth = bullet.offsetWidth;
        const totalWidth = bar.offsetWidth;
        const progress = currentWidth / totalWidth;
        const currentTime = this.state.currentMusicDuration * progress;
        if (this.state.currentAudio)
            this.state.currentAudio.currentTime = currentTime;
    }

    onAudioLoaded() {
        const audio = this.state.currentAudio;
        if (!audio) return;
        this.setState({ currentMusicDuration: audio.duration });
    }

    onAudioTimeChange() {
        const audio = this.state.currentAudio;
        if (!audio) return;
        this.setState({ currentMusicTime: audio.currentTime });
    }

    onPlay(music) {
        if (this.state.currentAudio) {
            this.state.currentAudio.pause();
            this.state.currentAudio.removeEventListener('loadeddata', this.onAudioLoaded);
            this.state.currentAudio.removeEventListener('timeupdate', this.onAudioTimeChange);
        }

        const audio = new Audio(music.url);
        this.setState({ currentMusic: music, currentAudio: audio, currentMusicTime: 0.0, currentMusicDuration: 0.0 });
        audio.addEventListener('loadeddata', this.onAudioLoaded);
        audio.addEventListener('timeupdate',this.onAudioTimeChange);
        audio.preload = 'auto';
        audio.play();
    }

    onNextMusic() {
        const music = this.state.currentMusic;
        if (!music) return;
        const nextIndex = (music.index + 1) % this.state.musics.length;
        const nextMusics = this.state.musics.filter(music => music.index === nextIndex);
        if (nextMusics.length !== 1) return;
        this.onPlay(nextMusics[0]);
    }

    onPreviousMusic() {
        const music = this.state.currentMusic;
        if (!music) return;
        let nextIndex = (music.index - 1);
        if (nextIndex < 0) nextIndex = this.state.musics.length - 1;
        const nextMusics = this.state.musics.filter(music => music.index === nextIndex);
        if (nextMusics.length !== 1) return;
        this.onPlay(nextMusics[0]);
    }

    onPlayPauseMusic() {
        if (!this.state.currentAudio) return;

        if (this.state.currentAudio.paused)
            this.state.currentAudio.play();
        else
            this.state.currentAudio.pause();
    }

    render() {

        return (
            <div>
                <div className="ms_main_wrapper">
                    <LeftMenu />
                    <Index 
                        onPlayPauseMusic={this.onPlayPauseMusic}
                        paused={this.state.currentAudio ? this.state.currentAudio.paused : true}
                        currentAudio={this.state.currentAudio}
                        musics={this.state.musics}
                        onPlay={this.onPlay} />
                    <Footer 
                        duration={this.state.currentMusicDuration}
                        currentTime={this.state.currentMusicTime}
                        onTimeChange={this.onAudioTimeChange}
                        onPlayPause={this.onPlayPauseMusic}
                        onNext={this.onNextMusic}
                        onPrevious={this.onPreviousMusic}
                        paused={this.state.currentAudio ? this.state.currentAudio.paused : true} />
                    <RegisterModal/>
                    <LoginModal/>
                </div>
                <div className="ms_clear_modal">
                    <div id="clear_modal" className="modal  centered-modal" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <button type="button" className="close" data-dismiss="modal">
                                    <i className="fa_icon form_close"/>
                                </button>
                                <div className="modal-body">
                                    <h1>Are you sure you want to clear your queue?</h1>
                                    <div className="clr_modal_btn">
                                        <a href="#">clear all</a>
                                        <a href="#">cancel</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ms_save_modal">
                    <div id="save_modal" className="modal  centered-modal" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <button type="button" className="close" data-dismiss="modal">
                                    <i className="fa_icon form_close"/>
                                </button>
                                <div className="modal-body">
                                    <h1>Log in to start sharing your music!</h1>
                                    <div className="save_modal_btn">
                                        <a href="#"><i className="fa fa-google-plus-square"
                                                       aria-hidden="true"/> continue with google </a>
                                        <a href="#"><i className="fa fa-facebook-square"
                                                       aria-hidden="true"/> continue with facebook</a>
                                    </div>
                                    <div className="ms_save_email">
                                        <h3>or use your email</h3>
                                        <div className="save_input_group">
                                            <input type="text" placeholder="Enter Your Name" className="form-control"/>
                                        </div>
                                        <div className="save_input_group">
                                            <input type="password" placeholder="Enter Password"
                                                   className="form-control"/>
                                        </div>
                                        <button className="save_btn">Log in</button>
                                    </div>
                                    <div className="ms_dnt_have">
                                        <span>Dont't have an account ?</span>
                                        <a href="javascript:" className="hideCurrentModel" data-toggle="modal"
                                           data-target="#myModal">Register Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
