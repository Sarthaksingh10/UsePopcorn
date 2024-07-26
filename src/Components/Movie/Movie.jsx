import propTypes from "prop-types";
export default function Movie({ movie, onselectmovie }) {
  return (
    <li onClick={() => onselectmovie(movie.Title)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
Movie.propTypes = {
  movie: propTypes.any.isRequired,
  onselectmovie: propTypes.func.isRequired,
};
