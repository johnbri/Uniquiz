import {database, auth} from '../services/firebase.js';
import React, { useState, useEffect} from "react";
import chatView from './view/chatView.js'

function Chat() {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("")

    useEffect(() => {
        try {
            database.ref('users/').on("value", (snapshot) => {
                console.log(snapshot);
                if (snapshot.val()) {
                    const values = Object.values(snapshot.val().message);
                    console.log(values);
                    setMessages(values);
                }
            });
        } catch(error) {
            console.log(error);
        }
    }, []);

    return React.createElement(chatView, {
        handleSubmit: () => {
        try {
            auth().onAuthStateChanged(function(userObj) {
                if (userObj) {
                  let user = auth().currentUser;
                  database.ref('users/' + user.uid).update({
                    message: userMessage
                  }).then( res => console.log("successfully sent message")).catch(console.log("Error sending message firebase DB"));
                } else {
                  console.log("There is no user logged in");
                }
              });
        } catch (error) {
            console.log(error);
        }
    }
    })
}

