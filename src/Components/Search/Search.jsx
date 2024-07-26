import propTypes from "prop-types";
export default function Search({ Query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={Query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

Search.propTypes = {
  Query: propTypes.any.isRequired,
  setQuery: propTypes.any.isRequired,
};
