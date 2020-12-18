import '../../css/playerSidebar.css';
import { roomModel } from '../..';

const PlayersSidebarView= ({creator, players, inRoom}) =>
    /** Displays all the players connected to the room */
    <div className="playersSidebar">
        {Object.keys(players).map(playerUid => 
            <div key={playerUid} className="boxContainer">
                <div className="posistionbox">
                {(window.location == (window.location.origin + "/quiz/answers") && players[playerUid].answer ) && <h3 className="answerText">"{players[playerUid].answer}"</h3>}
                    <div className="playerCard" key={playerUid}>
                        <div className="userImage">
                        {players[playerUid].profileImg === 'defaultProfilePic.jpg' ?
                            <img src={window.location.origin + '/' + players[playerUid].profileImg} alt ="playerImg" />
                            : <img src={players[playerUid].profileImg} alt ="playerImg" />}
                        {creator && <img className="creatorimg" src={window.location.origin + '/creator.png'} alt ="creatorImg" />}
                        </div>
                        {(window.location == (window.location.origin + "/quiz/answers") 
                        && roomModel.checkCorrectAnswer(players[playerUid].answer)) && <img className="correct" src={window.location.origin + '/correct.svg'} alt ="Loading gif" />}
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

