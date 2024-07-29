import propTypes from "prop-types";

export default function WatchedMovie({ movie, OnDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <div className="flex flex-col  ">
        <span className="flex  relative top-4">
          <h3>{movie.title}</h3>
        </span>

        <span className="flex relative bottom-4">
          <p className="p-4">
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p className="p-4">
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.Runtime} min</span>
          </p>
          <button
            onClick={() => OnDeleteWatched(movie.title)}
            className="p-4 ml-8 h-12 w-12 rounded-full bg-white flex justify-center items-center mt-4"
          >
            ❌
          </button>
        </span>
      </div>
    </li>
  );
}

WatchedMovie.propTypes = {
  movie: propTypes.any.isRequired,
  OnDeleteWatched: propTypes.func.isRequired,
};
