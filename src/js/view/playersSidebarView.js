import '../../css/playerSidebar.css';
import { roomModel } from '../..';

const PlayersSidebarView= ({players, inRoom, correctAnswer}) =>
    /** Displays all the players connected to the room */
    <div className="playersSidebar">
        {Object.keys(players).map((playerUid, index) => 
            <div key={playerUid} className="boxContainer">
                <div className="posistionbox">
                    <div className="playerCard" key={playerUid}>
                        <div className="userImage">
                        {players[playerUid].profileImg === 'defaultProfilePic.jpg' ?
                            <img src={window.location.origin + '/' + players[playerUid].profileImg} alt ="playerImg" />
                            : <img src={players[playerUid].profileImg} alt ="playerImg" />}
                        </div>
                        {correctAnswer[index] && <img className="correct" src={window.location.origin + '/correct.svg'} alt ="Loading gif" />}
                        <div className="userInfo">
                            <div className="displayName">
                                <h2>{players[playerUid].displayName}</h2>
                                {players[playerUid].host && <img className="creatorimg" src={window.location.origin + '/creator.png'} alt ="creatorImg" />}
                            </div>
                            {!inRoom && <h3>{players[playerUid].score} points</h3>}
                        </div>
                    </div>
                    {(window.location == (window.location.origin + "/quiz/answers") && players[playerUid].answer ) && <span className="answerText">"{players[playerUid].answer}"</span>}
                </div>
            </div>          
        )}
    </div>;
export default PlayersSidebarView;

