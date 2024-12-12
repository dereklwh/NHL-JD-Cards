import React, { useEffect, useState } from 'react'
import PlayerCard from "./components/playerCard/PlayerCard"
import  "./app.css";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {

  const [player, setPlayer] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [playerId, setPlayerId] = useState('8478402');
  const [suggestions, setSuggestions] = useState([]);

  const fetchPlayer = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/player/${id}`);
      const data = await response.json();
      setPlayer(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // handles searching for playerid
  const handleSearch = () => {
    setPlayerId(searchInput);
  }

  // if the user presses enter, search for the player
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // fetches list of players that match the search query
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/search?name=${query}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    fetchPlayer(playerId);
  }, [playerId]);

  useEffect(() => {
    fetchSuggestions(searchInput);
  }, [searchInput]);


  return (
    <div className="app-container">
      <div>
        <h1 style={{ textAlign: "center" }}>Player Cards Display</h1>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter player ID"
            style={{padding: '8px', width: '200px', marginRight: '10px'}}
          />
          {suggestions.length > 0 && (<ul style={{ listStyleType: 'none', background: '#fff', margin: '0', padding: '0', zIndex: 1000, position: 'absolute'}}>
            {suggestions.map((player) => (
              <li 
                key={player['Player ID']} onClick={() => setPlayerId(player['Player ID'])}
                style={{color: '#333'}}
                className="suggestion-item"
              >
                {player['First Name']} {player['Last Name']}
              </li>
            ))}s
          </ul>)}
          <button onClick={handleSearch}>Search</button>
        </div>
        <TransitionGroup>
          <CSSTransition
            key={player ? player['Player ID'] : null}
            timeout={500}
            classNames="fade"
          >
            <div>
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
