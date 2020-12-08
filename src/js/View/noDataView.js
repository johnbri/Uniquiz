import '../../css/Loading.css';

function NoDataView(data){  
    let noData = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i] === null || data[i].length === 0) {
            noData = true;
            break;
        } 
    };
    return (noData && <img src = "loading.gif" alt="loading gif"/> )
}
export default NoDataView;
