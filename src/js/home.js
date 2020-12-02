import React, { useEffect, useState } from "react";
import { homeView } from "./view/homeView.js";
import {auth, database} from '../services/firebase.js';
import userModel from "../index.js";
import useModelProp from "./useModelProp";

function Home(props) {
    const displayName = useModelProp(userModel, "displayName");

    return  React.createElement(homeView, {
        userName: displayName,
        onCreate: () => props.history.push({
            pathname: '/createJoin',
            newRoom: true
        }),
        onJoin: () => props.history.push({
            pathname: '/createJoin',
            newRoom: false
        })
    });
}

export default Home;