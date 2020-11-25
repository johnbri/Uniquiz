const { useEffect } = require("react")

class UserModel {
    constructor(email="", password="", accToken="", playlists={}){
    this.email = email
    this.password = password
    this.playlists = playlists
    this.topmMusic = this.getTopMusic()
    }
    
    getTopMusic(){
        //Använda api för att kolla topp låtar?

    }
    
}