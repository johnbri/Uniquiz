import React, { useEffect, useState } from "react";
import { homeView } from "./view/homeView.js";
import {auth, database} from '../services/firebase.js';
import {userModel} from "./App";

function Home(props) {
    return React.createElement(homeView, {
        userName: userModel,
        onCreate: () => props.history.push("/room"),
        onJoin: () => props.history.push("/join")
    });
}
export default Home;