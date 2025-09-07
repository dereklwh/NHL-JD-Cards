import React, { useEffect, useState } from 'react';
import PlayerCard from "./components/playerCard/PlayerCard";
import PlayerGrid from './components/playerGrid/PlayerGrid';
import { AnimatePresence, motion } from 'framer-motion';

import {
  Box, Pagination, Stack, FormControl, InputLabel, Select, MenuItem,
  TextField, Button, Paper
} from '@mui/material';

function App() {
  const [player, setPlayer] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [loadingPlayers, setLoadingPlayers] = useState(true);

  // pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const fetchPlayer = async (id) => {
    if (!id) return;
    const res = await fetch(`http://localhost:3000/player/${id}`);
    setPlayer(await res.json());
  };

  const getPlayers = async () => {
    const res = await fetch('http://localhost:3000/players');
    return res.json();
  };

  const handleSearch = () => setPlayerId(searchInput.trim());

  const fetchSuggestions = async (q) => {
    if (!q) return setSuggestions([]);
    const res = await fetch(`http://localhost:3000/search?name=${encodeURIComponent(q)}`);
    setSuggestions(await res.json());
  };

  useEffect(() => {
    (async () => {
      const players = await getPlayers();
      setAllPlayers(players || []);
      setLoadingPlayers(false);
    })();
  }, []);

  useEffect(() => { fetchPlayer(playerId); }, [playerId]);
  useEffect(() => { fetchSuggestions(searchInput); }, [searchInput]);
  useEffect(() => { setPlayer(null); }, [page, rowsPerPage]);

  const total = allPlayers.length;
  const pageCount = Math.max(1, Math.ceil(total / rowsPerPage));
  const clampedPage = Math.min(page, pageCount);
  const start = (clampedPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedPlayers = allPlayers.slice(start, end);

  useEffect(() => { if (page > pageCount) setPage(pageCount); }, [pageCount]);

  return (
    <div className="min-h-screen w-full bg-slate-100">
      <Box className="max-w-6xl mx-auto p-4 pt-6">
        <h1 className="text-center text-3xl font-semibold mb-4">Player Cards Display</h1>

        {/* Search row */}
        <Stack direction="row" spacing={4} justifyContent="center" className="relative mb-4">
          <TextField
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            label="Enter player ID or name"
            size="small"
            className="w-72"
          />
          <Button variant="contained" onClick={handleSearch}>Search</Button>

          {suggestions.length > 0 && (
            <Paper elevation={6} className="absolute top-12 left-1 w-72 max-h-60 overflow-y-auto z-10">
              <ul className="divide-y">
                {suggestions.map(p => (
                  <li
                    key={p['Player ID']}
                    onClick={() => {
                      setPlayerId(p['Player ID']);
                      setSearchInput(`${p['First Name']} ${p['Last Name']}`);
                      setSuggestions([]);
                    }}
                    className="px-3 py-2 hover:bg-slate-100 cursor-pointer"
                  >
                    {p['First Name']} {p['Last Name']}
                  </li>
                ))}
              </ul>
            </Paper>
          )}
        </Stack>

        <AnimatePresence mode="wait">
          {player ? (
            <motion.div
              key={player['Player ID']}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <PlayerCard player={player} />
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${clampedPage}-${rowsPerPage}-${total}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PlayerGrid
                players={paginatedPlayers}
                loading={loadingPlayers}
                onSelectPlayer={setPlayerId}
              />

              {/* Pagination controls */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems="center"
                justifyContent="between"
                className="mt-6"
              >
                <FormControl size="small" className="min-w-36">
                  <InputLabel id="rows-per-page-label">Per page</InputLabel>
                  <Select
                    labelId="rows-per-page-label"
                    label="Per page"
                    value={rowsPerPage}
                    onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
                  >
                    {[6, 12, 24, 48].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
                  </Select>
                </FormControl>

                <Pagination
                  count={pageCount}
                  page={clampedPage}
                  onChange={(_, newPage) => setPage(newPage)}
                  siblingCount={1}
                  boundaryCount={1}
                  color="primary"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                  className="mx-auto"
                />
              </Stack>

              <div className="text-center text-slate-500 text-sm mt-2">
                Showing {total === 0 ? 0 : start + 1}–{Math.min(end, total)} of {total}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </div>
  );
}

export default App;
