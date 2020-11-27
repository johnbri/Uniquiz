import React from "react";
import { homeView } from "./view/homeView.js";
function Home(props) {
    return React.createElement(homeView, {
        onCreate: () => props.history.push("/room"),
        onJoin: () => props.history.push("/join")
    });
}
export default Home;