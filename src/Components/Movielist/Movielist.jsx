import propTypes from "prop-types";
import Movie from "../Movie/Movie";

export default function Movielist({ movies, onselectmovie }) {
  return (
    <ul className="list ">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onselectmovie={onselectmovie} />
      ))}
    </ul>
  );
}
Movielist.propTypes = {
  movies: propTypes.array.isRequired,
  onselectmovie: propTypes.func.isRequired,
};
