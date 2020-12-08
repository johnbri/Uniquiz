import '../../css/quiz.css';

const PlayersSidebarView= ({players}) =>
    /** Displays all the players connected to the room */
    <div className="playersSidebar">
        {players.map(player => 
            <div className = "playerCard">
                <div className="userImg">
                    <img src={player.profileImg} alt="playerImg"/>
                </div>
                <h2>{player.displayName}</h2>
                <h3>Score: {player.score}</h3>
            </div>
        )}
    </div>;
export default PlayersSidebarView;

