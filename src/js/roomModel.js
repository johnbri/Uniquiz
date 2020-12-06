class RoomModel {
    constructor(roomName = "", players=[]){
        this.roomName = roomName;
        this.players = players;
        this.subscribers = [];
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
    
    getPlayers(){
        return this.players;
    }

    setRoomName(roomName) {
        this.roomName = roomName;
    }

}

export default RoomModel;