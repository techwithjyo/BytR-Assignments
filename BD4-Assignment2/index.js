const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3010;
let db;

(async () => {
  db = await open({
    filename: "BD4-Assignment2/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4 Assignment2 Template" });
});

app.get('/games', async (req, res) => {
    try {
      let results = await fetchAllGames();
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchAllGames = async () => {
    let query = 'SELECT * FROM games';
    let response = await db.all(query, []);
    return { games: response };
  };
  
  app.get('/games/details/:id', async (req, res) => {
    const { id } = req.params;
    try {
      let results = await fetchGameById(id);
      if (!results.game) {
        return res.status(404).json({ error: "Game not found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchGameById = async (id) => {
    let query = 'SELECT * FROM games WHERE id = ?';
    let response = await db.get(query, [id]);
    return { game: response };
  };
  
  app.get('/games/genre/:genre', async (req, res) => {
    const { genre } = req.params;
    try {
      let results = await fetchGamesByGenre(genre);
      if (results.games.length === 0) {
        return res.status(404).json({ error: "No games found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchGamesByGenre = async (genre) => {
    let query = 'SELECT * FROM games WHERE genre = ?';
    let response = await db.all(query, [genre]);
    return { games: response };
  };
  
  app.get('/games/platform/:platform', async (req, res) => {
    const { platform } = req.params;
    try {
      let results = await fetchGamesByPlatform(platform);
      if (results.games.length === 0) {
        return res.status(404).json({ error: "No games found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchGamesByPlatform = async (platform) => {
    let query = 'SELECT * FROM games WHERE platform = ?';
    let response = await db.all(query, [platform]);
    return { games: response };
  };
  
  app.get('/games/sort-by-rating', async (req, res) => {
    try {
      let results = await fetchGamesSortedByRating();
      if (results.games.length === 0) {
        return res.status(404).json({ error: "No games found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchGamesSortedByRating = async () => {
    let query = 'SELECT * FROM games ORDER BY rating DESC';
    let response = await db.all(query, []);
    return { games: response };
  };
  
  app.get('/players', async (req, res) => {
    try {
      let results = await fetchAllPlayers();
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchAllPlayers = async () => {
    let query = 'SELECT * FROM players';
    let response = await db.all(query, []);
    return { players: response };
  };
  
  app.get('/players/details/:id', async (req, res) => {
    const { id } = req.params;
    try {
      let results = await fetchPlayerById(id);
      if (!results.player) {
        return res.status(404).json({ error: "Player not found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchPlayerById = async (id) => {
    let query = 'SELECT * FROM players WHERE id = ?';
    let response = await db.get(query, [id]);
    return { player: response };
  };
  
  app.get('/players/platform/:platform', async (req, res) => {
    const { platform } = req.params;
    try {
      let results = await fetchPlayersByPlatform(platform);
      if (results.players.length === 0) {
        return res.status(404).json({ error: "No players found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchPlayersByPlatform = async (platform) => {
    let query = 'SELECT * FROM players WHERE platform = ?';
    let response = await db.all(query, [platform]);
    return { players: response };
  };
  
  app.get('/players/sort-by-rating', async (req, res) => {
    try {
      let results = await fetchPlayersSortedByRating();
      if (results.players.length === 0) {
        return res.status(404).json({ error: "No players found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchPlayersSortedByRating = async () => {
    let query = 'SELECT * FROM players ORDER BY rating DESC';
    let response = await db.all(query, []);
    return { players: response };
  };
  
  app.get('/tournaments', async (req, res) => {
    try {
      let results = await fetchAllTournaments();
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchAllTournaments = async () => {
    let query = 'SELECT * FROM tournaments';
    let response = await db.all(query, []);
    return { tournaments: response };
  };

app.get('/tournaments/details/:id', async (req, res) => {
    const { id } = req.params;
    try {
      let result = await getTournamentById(id);
      if (!result.tournament) {
        return res.status(404).json({ error: "Tournament not found" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const getTournamentById = async (id) => {
    let query = 'SELECT * FROM tournaments WHERE id = ?';
    let response = await db.get(query, [id]);
    return { tournament: response };
  };
  
  app.get('/tournaments/game/:GameId', async (req, res) => {
    const { GameId } = req.params;
    try {
      let results = await getTournamentsByGameId(GameId);
      if (results.tournaments.length === 0) {
        return res.status(404).json({ error: "No tournaments found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const getTournamentsByGameId = async (GameId) => {
    let query = 'SELECT * FROM tournaments WHERE gameId = ?';
    let response = await db.all(query, [GameId]);
    return { tournaments: response };
  };
  
  app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
    try {
      let results = await getTournamentsOrderedByPrize();
      if (results.tournaments.length === 0) {
        return res.status(404).json({ error: "No tournaments found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const getTournamentsOrderedByPrize = async () => {
    let query = 'SELECT * FROM tournaments ORDER BY prizepool DESC';
    let response = await db.all(query, []);
    return { tournaments: response };
  };

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
