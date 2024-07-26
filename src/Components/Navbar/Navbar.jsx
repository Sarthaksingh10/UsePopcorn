import propTypes from "prop-types";
export default function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
Navbar.propTypes = {
  children: propTypes.any,
};
