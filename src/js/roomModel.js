class RoomModel {
    /** Model containing information for the room currently connected to the logged in user from firebase*/
    constructor(roomName = "", players=[]){
        this.roomName = roomName;
        this.players = players;
        this.subscribers = [];
        //this.playlist = playlist;
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
    }

    getPlaylist() {
        return this.playList;
    }

    setAnswer(answer) {
        this.answers.push(answer);
    }

    getAnswers() {
        return this.answers;
    }

}

export default RoomModel;