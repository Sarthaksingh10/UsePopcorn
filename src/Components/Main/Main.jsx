import propTypes from "prop-types";
export default function Main({ children }) {
  return <main className="main">{children}</main>;
}
Main.propTypes = {
  children: propTypes.any,
};
