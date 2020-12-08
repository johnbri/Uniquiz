
import { database, syncRoomModelToFB, updateRoomPlayersFB } from "../services/firebase";
class RoomModel {
    /** Model containing information for the room currently connected to the logged in user from firebase*/
    constructor(roomName = "", players=[]){
        this.roomName = roomName;
        this.players = players;
        this.subscribers = [];
        this.playlist = null;
        this.playedSongs = [];
        this.answers = [];
        this.score = 0;
        this.creator = false;
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
        return this.players.map((player) => player.uid);
    }
        getPlayedSong() {
        return this.playedSongs[0];
    }

    getAnswer() {
        return this.answers[0];
    }

    getCurrentSong() {
        /** Returns the first song in the playlist and sets is as a played song*/
        let currentSong = this.playlist[0];
        this.playedSongs = [currentSong, ...this.playedSongs];
        this.playlist.shift();
        return currentSong;
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
        this.playlist = playlist;
        //this.notifyObservers();
    }

    setAnswer(answer) {
        this.answers = [answer, ...this.answers];
        this.notifyObservers();
    }

    setScore() {
        this.score+=1;
        this.notifyObservers();
    }

    addPlayers(newPlayer) {
        /** Adds a player that is not in the room to  players list*/
        this.players = this.players.filter(player => {
            if (player === newPlayer){
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