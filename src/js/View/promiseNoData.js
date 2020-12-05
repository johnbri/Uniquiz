function PromiseNoData(promise, data, error, h){  
    return !promise && "no data"     // case "0"  
          || error && <h1>error</h1>   // case 3 
          || !data && <img src="http://www.csc.kth.se/~cristi/loading.gif"/>     // case 1
}
export default PromiseNoData;