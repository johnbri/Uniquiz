function NoDataView(data){  
    let noData = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i] === null) {
            noData = true;
            console.log(data[i]);
            break;
        } 
    };
    return (noData && <img src="http://www.csc.kth.se/~cristi/loading.gif" alt= "Loading"/>)
}
export default NoDataView;