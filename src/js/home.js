import React, { useState } from "react";
import { homeView } from "./view/homeView.js";
import  usePromise  from "./usePromise"

function Home() {
    const [apiPromise, setApiPromise] = useState(null);
    React.useEffect(()=>setApiPromise(),
    []);

    const [data]= usePromise(apiPromise);

    return React.createElement(homeView, {
        txt: data
    });
}
export default Home;