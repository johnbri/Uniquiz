import React, { useEffect, useState } from "react";
import { loginUrl } from "./spotify";
import { homeView, LoginView } from "../js/view/homeView";
import  usePromise  from "./usePromise"

function Home() {
    const [apiPromise, setApiPromise] = useState(null);
    React.useEffect(()=>setApiPromise(),
    []);

    const [data, error]= usePromise(apiPromise);

    return React.createElement(homeView, {
        txt: data
    });
}
export default Home;