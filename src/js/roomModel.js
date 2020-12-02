class roomModel {
    constructor(roomName=""){
        this.roomName=roomName;
        this.player= {}
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

    setPlayers(players) {
        this.players = players;
        this.notifyObservers();
    }

}

export default roomModel;