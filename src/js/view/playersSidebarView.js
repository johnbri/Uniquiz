import '../../css/playerSidebar.css';
import { roomModel } from '../..';

const PlayersSidebarView= ({players, inRoom}) =>
    /** Displays all the players connected to the room */
    <div className="playersSidebar">
        {Object.keys(players).map(playerUid => 
            <div key={playerUid} className="boxContainer">
                <div className="posistionbox">
                {players[playerUid].answer && <h3 className="answerText">"{players[playerUid].answer}"</h3>}
                    <div className="playerCard" key={playerUid}>
                        <div className="userImage">
                        {players[playerUid].profileImg === 'defaultProfilePic.jpg' ?
                            <img src={window.location.origin + '/' + players[playerUid].profileImg} alt ="playerImg" />
                            : <img src={players[playerUid].profileImg} alt ="playerImg" />}
                        </div>
                        {window.location == (window.location.origin + "/quiz/answers") 
                        && roomModel.checkCorrectAnswer(players[playerUid].answer) && <img className="light" src={window.location.origin + '/correct.svg'} alt ="Loading gif" />}
                        <div className="userInfo">
                            <h2>{players[playerUid].displayName}</h2>
                            {!inRoom && <h3>{players[playerUid].score} points</h3>}
                        </div>
                    </div>
                </div>
            </div>
            
        )}
    </div>;
export default PlayersSidebarView;

