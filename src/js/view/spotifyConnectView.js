import '../../css/Login.css';
const SpotifyConnectView= ({onLogin}) =>
    /** Page that lets the user sign up with spotify */
    <div className="wrapper">
        <div className="spotifyConnect">
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="Spotify logo"/>
            <h2>To know what songs you listen to UniQuiz have to read your spotify playlists.</h2>
            <button onClick={() => onLogin()}>CONNECT TO SPOTIFY</button>
        </div>
    </div>;

export {SpotifyConnectView};