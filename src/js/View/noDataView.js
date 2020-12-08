import '../../css/Loading.css';

function NoDataView(data){  
    let noData = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i] === null || data[i].length === 0) {
            noData = true;
            break;
        } 
    };
    return (noData && loading())
}
export default NoDataView;

const loading = () => 
    <div className="loader">
    <div className="duo duo1">
        <div className="dot dot-a"></div>
        <div className="dot dot-b"></div>
    </div>
    <div className="duo duo2">
        <div className="dot dot-a"></div>
        <div className="dot dot-b"></div>
    </div>
    </div>;
