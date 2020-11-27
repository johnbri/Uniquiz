import React, { useEffect, useState } from "react";
import { homeView } from "./view/homeView.js";
import {auth, database} from '../services/firebase.js';
function Home(props) {
    return React.createElement(homeView, {
        onCreate: () => props.history.push("/room"),
        onJoin: () => props.history.push("/join")
    });
}
export default Home;