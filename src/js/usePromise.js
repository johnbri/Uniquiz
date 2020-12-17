import {useEffect, useState} from "react";

function usePromise(promise) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    console.log(promise);
    useEffect(function(){ 
        setData(null); 
        setError(null);
        promise && promise.then(dt => setData(dt)).catch(er => setError(er));    
    }, [promise]); 

    return [data, error];
}

export default usePromise;