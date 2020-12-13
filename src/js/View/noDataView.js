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
<<<<<<< HEAD
            <img src={window.location.origin + '/loading.svg'} alt ="Loading gif" />
=======
            <img src={window.location.origin + '/loading.svg'} alt ="Loading gif" /> 
>>>>>>> c4ba3a6d11f9dae79d8be4d4b0c91729ce1dee57
            <h1>{loadingstring}</h1>
        </div>
    )
}
export default NoDataView;
