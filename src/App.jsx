import "./App.css";
import { useState } from "react";

function MovieCard(props) {
  return (
    <div className="movie-card">
      {props.poster !== "N/A" ? (
     <img src={props.poster} alt={props.title}></img>
      ) : (
        <div className="no-poster">🎬 No Image</div>
      )}
      <h3>{props.title}</h3>
      <p>{props.year}</p>
    </div>
  )
}

function App() {
  const [ search, setSearch ] = useState("");
  const [ movies, setMovies ] = useState([]);

  async function getMovies() {
   const response = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=trilogy`);
   const data = await response.json();
   setMovies(data.Search);
  }

return (
  <div className="app">
    <h1>🎬 Movie Search</h1>
    <div className="search">
      <input value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder="Search for a movie"/>
      <button onClick={getMovies}>Search</button>
    </div>
    <div className="movies">
      {movies && movies.map(movie => (
        <MovieCard
        key={movie.imdbID}
        title={movie.Title}
        year={movie.Year}
        poster={movie.Poster}
        />
      ))}
    </div>
  </div>
)
}

export default App;