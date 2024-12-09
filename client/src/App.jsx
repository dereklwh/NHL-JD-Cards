import React, { useEffect, useState } from 'react'
import PlayerCard from "./components/playerCard/PlayerCard"
import  "./app.css";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {

  const [player, setPlayer] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [playerId, setPlayerId] = useState('8478402')

  const fetchPlayer = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/player/${id}`);
      const data = await response.json();
      setPlayer(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPlayer(playerId);
  }, [playerId]);

  const handleSearch = () => {
    setPlayerId(searchInput);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


  return (
    <div className="app-container">
      <div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter player ID"
            style={{padding: '8px', width: '200px', marginRight: '10px'}}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <TransitionGroup>
          <CSSTransition
            key={player ? player['Player ID'] : null}
            timeout={500}
            classNames="fade"
          >
            <div>
              <h1 style={{ textAlign: "center" }}>Player Card</h1>
              {player ? (
                <PlayerCard player={player} />
              ) : (
                <p style={{ textAlign: "center" }}>Loading player data...</p>
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>
        </div>
    </div>
  );

};

export default App
