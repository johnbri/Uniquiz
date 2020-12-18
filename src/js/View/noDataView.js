import '../../css/Loading.css';

function NoDataView(data, loadingstring=""){  
    let noData = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i] === null || data[i].length === 0 ) {
            noData = true;
            break;
        } 
    };
    return (noData && 
        <div className="loadingComponent">
            <div>
                <div className="loadingGif">
                    <img src={window.location.origin + '/loading.svg'} alt ="Loading gif" /> 
                </div>
                <h1>{loadingstring}</h1>
            </div>
        </div>
    )
}
export default NoDataView;
