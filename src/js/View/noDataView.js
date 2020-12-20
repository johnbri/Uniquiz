import '../../css/Loading.css';

function NoDataView(loadingstring=""){  
    return (
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
