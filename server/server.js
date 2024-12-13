const express = require('express');
const app=express();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173',
}
const fs = require('fs');
const csv = require('csv-parser');

app.use(cors(corsOptions));

let playerTable = [];

fs.createReadStream('../data/nhl_players.csv')
  .pipe(csv())
  .on('data', (row) => {
    playerTable.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully loaded.');
  });


app.get('/player/:playerId',(req,res)=> {
    const playerId = parseInt(req.params.playerId, 10);

    // Find the player in the data
    const player = playerTable.find((p) => parseInt(p['Player ID'], 10) === playerId);
  
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
  
    res.json(player);
});


app.get('/search', (req, res) => {
    const query = req.query.name;
    if (!query) {
        return res.status(400).json({ error: 'No name provided'});
    }

    const lowerQuery = query.toLowerCase();

    const results = playerTable.filter((player) => {
        const fullName = `${player['First Name']} ${player['Last Name']}`.toLowerCase();
        return fullName.includes(lowerQuery);
    });

    res.json(results.slice(0, 10));
});

app.get('/players', (req, res) => {
  res.json(playerTable);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})