import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { Client } from 'appwrite';
const api_base = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_API_KEY;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${api_key}`,
  },
};
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import { updateSearchCount } from './appwrite';
import Trending from './components/Trending';
import { getTrendingMovies } from './appwrite';

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [trends, setTrends] = useState([]);

  const loadTrends = async () => {
    setLoading(true);
    try {
      const trending = await getTrendingMovies();
      setTrends(trending);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      setError('There was a problem with your fetch operation');
    }
    setLoading(false);
  };

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const endpoint = query
        ? `${api_base}/search/movie?query=${encodeURIComponent(query)}`
        : `${api_base}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, options);
      if (!response.ok) {
        setError('There was a problem with your fetch operation');
      }
      const data = await response.json();

      setMovies(data.results);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      setError('There was a problem with your fetch operation');
    }
    setLoading(false);
  };

  useDebounce(() => setDebouncedSearch(search), 1000, [search]);

  useEffect(() => {
    fetchMovies(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    loadTrends();
  }, []);

  return (
    <>
      <Header setSearch={setSearch} />
      {loading || <Trending trends={trends} />}
      {loading && <p className='text-light-100'>Loading...</p>}
      {loading || <MovieList movies={movies} search={search} error={error} />}
    </>
  );
}

export default App;