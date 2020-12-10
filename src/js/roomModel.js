
import { userModel } from "../index";
import { database, syncRoomModelToFB, updateRoomPlayersFB } from "../services/firebase";
class RoomModel {
    /** Model containing information for the room currently connected to the logged in user from firebase*/
    constructor(roomName = "", players=[]){
        this.roomName = roomName;
        this.players = players;
        this.subscribers = [];
        this.playlist = [];
        this.playedSongs = [];
        this.answers = [];
        this.score = 0;
        this.creator = false;
        this.started = false;
    }

    getRoomName() {
        return this.roomName;
    }

    getPlayers() {
        return [...this.players];
    }

    getPlaylist() {
        return [...this.playlist];
    }

    getPlayersUid() {
        return Object.keys(this.players);
        //return this.players.map((player) => player.uid);
    }
    
    getPlayedSong() {
        return this.playedSongs[0];
    }

    getAnswer() {
        return this.answers[0];
    }

    getPlayerInfo() {
        const playerUid = Object.keys(this.players).filter(uid => uid===userModel.uid)
        //const player = this.players.filter(player => player.uid === userModel.uid)
        return this.players[playerUid];
    }

    getCurrentSong() {
        /** Returns the first song in the playlist and sets is as a played song*/
        let currentSong = this.playlist[0];
        this.playedSongs = [currentSong, ...this.playedSongs];
        this.playlist.shift();
        return currentSong;
    }

    getStarted() {
        return this.started;
    }

    setRoomName(roomName) {
        this.roomName = roomName;
        this.notifyObservers();
    }

    setCreator(boolean) {
        this.creator = boolean;
        this.notifyObservers();
    }
    setPlayers(players){
        this.players = players;
        this.notifyObservers();
    }

    setPlaylist(playlist) {
        if (playlist !== null){
        this.playlist = playlist;
        this.notifyObservers();
        }
    }

    setAnswer(answer) {
        this.answers = [answer, ...this.answers];
        this.notifyObservers();
    }

    setStarted(started) {
        this.started = started;
        this.notifyObservers();
    }

    addPlayers(newPlayer) {
        /** Adds a player that is not in the room to  players list*/
        this.players = this.players.filter(player => {
            if (player.uid === newPlayer.uid){
                console.log("Player is already in room!")}
            else {
                return newPlayer
            }}).concat(newPlayer);
            this.notifyObservers();
    }

    addObserver(obs){
        this.subscribers= this.subscribers.concat(obs);   
        return ()=> this.removeObserver(obs);                                                   
    }

    removeObserver(obs){
        this.subscribers= this.subscribers.filter(o=> o!== obs); 
    }

    notifyObservers(){
        this.subscribers.forEach(callback=> {
            try{callback()}catch(err){
                  console.error("Error ", err, callback);}
        })
    }

}

export default RoomModel;