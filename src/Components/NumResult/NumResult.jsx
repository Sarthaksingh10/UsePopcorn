import propTypes from "prop-types";
export default function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
NumResult.propTypes = {
  movies: propTypes.array.isRequired,
};
