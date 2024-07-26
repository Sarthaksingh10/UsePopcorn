import propTypes from "prop-types";
export default function ErrorMessage({ message }) {
  return <div>{message}</div>;
}

ErrorMessage.propTypes = {
  message: propTypes.string.isRequired,
};
