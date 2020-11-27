
import {auth, database} from '../services/firebase.js';

class UserModel {
    constructor(uid){
    this.uid=uid
    this.subscribers =[]
    this.token = ""
    this.user = ""
    this.displayName = ""
    }
    
    addObserver(obs){
        this.subscribers= this.subscribers.concat(obs);   
        return ()=> this.removeObserver(obs);                                                   
    }

    removeObserver(obs){
        this.subscribers= this.subscribers.filter(o=> o!= obs); 
    }

    notifyObservers(){
        this.subscribers.forEach(callback=> {
            try{callback()}catch(err){
                  console.error("Error ", err, callback);}
        })
    }

    setToken() {
        database
        .ref('/users/' + this.uid + "/token")
        .on('value', (snapshot) => {
            console.log(snapshot.val());
        })
        this.notifyObservers()
    }

    setDisplayName(displayName) {
        this.displayName = displayName;
    }

    getDisplayName() {
        return this.displayName;
    }

    setuid() {
        this.uid = this.user.uid;
    }

    setUser(currentUser) {
        this.user = currentUser;
    }

}

export default UserModel