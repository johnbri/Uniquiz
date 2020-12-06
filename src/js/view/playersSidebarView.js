const PlayersSidebarView = ({players}) =>
    <div>
        {players.map(player =>
            <div>
                <img src={player.image} alt="profilepicture"/>
                <h2>{player.displayName}</h2>
            </div>
        )}
    </div>

export default PlayersSidebarView;
