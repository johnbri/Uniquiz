import '../../css/Login.css';
const SpotifyConnectView= ({onLogin}) =>
    /** Page that lets the user sign up with spotify */
    <div className="spotifyConnect">
        <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="Spotify logo"
        /> <br/>
       <button onClick={() => onLogin()}>LOGIN WITH SPOTIFY</button>
    </div>;

export {SpotifyConnectView};