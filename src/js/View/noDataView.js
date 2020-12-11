import '../../css/Loading.css';

function NoDataView(data, loadingstring){  
    let noData = false;
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        if (data[i] === null || data[i].length === 0 ) {
            noData = true;
            break;
        } 
    };
    return (noData && 
        <div className="loadingComponent">
            <img src = "loading.svg" alt="loading gif"/> 
            <h1>{loadingstring}</h1>
            <div class="ldBar"></div>
        </div>
    )
}
export default NoDataView;
