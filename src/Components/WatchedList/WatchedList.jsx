import { WatchedMovie } from "../index";
import propTypes from "prop-types";
export default function WatchedList({ watched, OnDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.title}
          OnDeleteWatched={OnDeleteWatched}
        />
      ))}
    </ul>
  );
}
WatchedList.propTypes = {
  watched: propTypes.array.isRequired,
  OnDeleteWatched: propTypes.func.isRequired,
};
