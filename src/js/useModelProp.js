import { useEffect, useState } from "react";

function useModelProp (model,prop) {
    const [propValue, setPropValue] = useState(model[prop]);
    useEffect (function() { 
        return model.addObserver(() => setPropValue(model[prop]));
    }, [model, prop]);
    return propValue;
}

export default useModelProp;