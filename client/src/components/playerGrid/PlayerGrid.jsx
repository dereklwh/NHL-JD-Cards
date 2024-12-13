import React from 'react';

const PlayerGrid = ({ players, onSelectPlayer }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px'}}>
      {players.map((p) => (
        <div
          key={p['Player ID']}
          style={{
            background: '#4e7f77',
            padding: '20px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
          onClick={() => onSelectPlayer(p['Player ID'])}
          onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(145deg, #ee7f77, #3b6b63)'}
          onMouseOut={(e) => e.currentTarget.style.background = '#4e7f77'}
        >
            <img src={p.Headshot} style={{ width: '30%', display: 'block', borderRadius: '50%', margin: '0 auto 10px', background: 'white'}}/>    
            {p['First Name']} {p['Last Name']} ({p['Team Abbreviation']})
        </div>
      ))}
    </div>
  );
};

export default PlayerGrid;
