
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
        database()
        .ref('/users/' + this.uid + "/token")
        .on('value', (snapshot) => {
            this.token =snapshot.val();
        })
        this.notifyObservers()
    }

    setDisplayName() {
        return database
        .ref('/users/' + this.uid + "/displayName")
        .on('value', (snapshot) => {
            this.displayName =snapshot.val();
            this.notifyObservers()
        })
        
        
    }

    setUser(currentUser) {
        this.user  = currentUser;
        this.uid = this.user.uid;
       
        this.displayName = this.setDisplayName();
        console.log(this.displayName)
    }

}

export default UserModel