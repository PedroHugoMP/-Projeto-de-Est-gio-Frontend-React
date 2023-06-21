import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
const API_BASE_URL = 'https://hugopedro331@gmail.com/games-test-api-81e9fb0d564a.herokuapp.com/api/data';

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_BASE_URL);
        setGames(response.data);
        setLoading(false);
      } catch (error) {
        handleError(error);
      }
    };
    fetchGames();
  }, []);

  const handleError = (error) => {
    setLoading(false);
    if (
      [500, 502, 503, 504, 507, 508, 509].includes(error.response?.status)
    ) {
      setError('O servidor falhou em responder, tente recarregar a página');
    } else {
      setError('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde');
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredGames = games.filter((game) =>
      game.title.toLowerCase().includes(searchTerm)
    );
    setGames(filteredGames);
  };

  const handleGenreFilter = (genre) => {
    const filteredGames = games.filter((game) => game.genre === genre);
    setGames(filteredGames);
  };

  return (
    <div className="App">
      <h1>Lista de Jogos</h1>
      <input
        type="text"
        placeholder="Buscar por título"
        onChange={handleSearch}
      />
      <div className="genre-filter">
        <button onClick={() => setGames(games)}>Pesquisar</button>
        {Array.from(new Set(games.map((game) => game.genre))).map((genre) => (
          <button key={genre} onClick={() => handleGenreFilter(genre)}>
            {genre}
          </button>
        ))}
      </div>
      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <Circles type="ThreeDots" color="#00BFFF" height={80} width={80} />
      ) : (
        <div className="game-list">
          {games.map((game) => (
            <div key={game.id} className="game-card">
              <img src={game.image} alt={game.title} />
              <h2>{game.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}

export default App;
