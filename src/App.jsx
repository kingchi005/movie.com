import { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// 4e1bb63

const API_URL = "http://www.omdbapi.com?apikey=4e1bb63";

const movie1 = {
	Title: "Superman, Spiderman or Batman",
	Year: "2011",
	imdbID: "tt2084949",
	Type: "movie",
	Poster:
		"https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg",
};

const App = () => {
	const [movies, setMovies] = useState([]);
	const [sParam, setsParam] = useState("");

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();
		setMovies(data.Search);
	};

	useEffect(() => {
		searchMovies("spiderman");
	}, []);

	return (
		<div className="app">
			<h1>Kingchi Movies</h1>

			<div className="search">
				<input
					placeholder="Search for movies"
					value={sParam}
					onChange={(e) => setsParam(e.target.value)}
					onKeyUp={() => searchMovies(sParam)}
				/>
				<img
					src={searchIcon}
					alt="search"
					onClick={() => searchMovies(sParam)}
				/>
			</div>
			{movies?.length > 0 ? (
				<div className="container">
					{movies.map((movie) => (
						<MovieCard key={movie.imdbID} movie={movie} />
					))}
				</div>
			) : (
				<div className="empty">
					<h2>No movies found</h2>
				</div>
			)}
		</div>
	);
};

export default App;
