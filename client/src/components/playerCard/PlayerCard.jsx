import React from "react";
import "./PlayerCard.css";

const PlayerCard = ({ player }) => {
  return (
    <div className="player-card">
      <div className="number-badge">{player["Sweater Number"]}</div>
      <img
        className="headshot"
        src={player.Headshot}
        alt={`${player["First Name"]} ${player["Last Name"]}`}
      />
      <h2 className="player-name">
        {player["First Name"]} {player["Last Name"]}
      </h2>
      <div className="player-stats">
        <p>Team: {player["Team Abbreviation"]}</p>
        <p>Position: {player.Position}</p>
        <p>Games Played: {player["Games Played"]}</p>
        <p>Goals: {player.Goals}</p>
        <p>Assists: {player.Assists}</p>
        <p>Points: {player.Points}</p>
        <p>Plus/Minus: {player["Plus/Minus"]}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
