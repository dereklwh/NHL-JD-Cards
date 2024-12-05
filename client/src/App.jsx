import React, { useEffect, useState } from 'react'
import PlayerCard from "./components/playerCard/PlayerCard"
import  "./app.css";

function App() {

  const [player, setPlayer] = useState(null);

  const fetchPlayer = async () => {
    try {
      const response = await fetch('http://localhost:3000/player/8478402');
      const data = await response.json();
      setPlayer(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    fetchPlayer();
  }, []);

  return (
    <div className="app-container">
      <div>
        <h1 style={{ textAlign: "center" }}>Player Card</h1>
        {player ? (
          <PlayerCard player={player} />
        ) : (
          <p style={{ textAlign: "center" }}>Loading player data...</p>
        )}
      </div>
    </div>
  );

};

export default App
