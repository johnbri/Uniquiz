class UserModel {
    /** Model containing information for logged in user from firebase*/
    constructor(uid = "", token = "", displayName = "", currentRoom = ""){
        this.uid=uid;
        this.subscribers = [];
        this.token = token;
        this.displayName = displayName;
        this.currentRoom = currentRoom;
    }

    getDisplayName() {
        return this.displayName;
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

    setToken(token) {
        this.token = token;
        this.notifyObservers();
    }

    setDisplayName(displayName) {
        this.displayName = displayName;
        this.notifyObservers();
    }

    setUid(uid) {
        this.uid = uid;
        this.notifyObservers();
    }

    setUser(currentUser) {
        this.user = currentUser;
        this.notifyObservers();
    }

    setCurrentRoom(roomName) {
        this.currentRoom = roomName;
        this.notifyObservers();
    }

}

export default UserModel