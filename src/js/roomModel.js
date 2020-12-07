import { syncRoomModelToFB, updateRoomPlayersFB } from "../services/firebase";

class RoomModel {
    /** Model containing information for the room currently connected to the logged in user from firebase*/
    constructor(roomName = "", players=[]){
        this.roomName = roomName;
        this.players = players;
        this.subscribers = [];
        this.playList = [];
        this.playedSongs = [];
        this.answers = [];
        this.score = 0;
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

    addPlayers(newPlayer) {
        this.players = this.players.filter(player => {
            if (player === newPlayer){
                console.log("Player is already in room!")}
            else {
                return newPlayer
            }}).concat(newPlayer);
            this.notifyObservers();
    }

    setPlayers(players){
        this.players = players;
        this.notifyObservers();
    }

    setRoomName(roomName) {
        this.roomName = roomName;
        this.notifyObservers();
    }

    setPlaylist(playList) {
        this.playList = playList;
        this.notifyObservers();
    }

    getCurrentSong() {
        let currentSong = this.playList[0];
        this.playedSongs = [currentSong, this.playedSongs];
        this.playList.shift();
        return currentSong;
    }

    setAnswer(answer) {
        this.answers = [answer, this.answers];
        this.notifyObservers();
    }

    getAnswer() {
        return this.answers[0];
    }

    getPlayedSong() {
        return this.playedSongs[0];
    }

    setScore() {
        this.score+=1;
        this.notifyObservers();
    }

}

export default RoomModel;