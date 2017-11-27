import PropTypes from "prop-types";
import handleScroll from "./handleScroll";

/**
 * Component that uses render props to inject
 * a function that allows the consumer to scroll to a
 * position in the window.
 */
function ScrollTo(props) {
  return props.children && props.children(handleScroll);
}

ScrollTo.defaultProps = {
  children: () => {}
};

ScrollTo.propTypes = {
  children: PropTypes.func.isRequired
};

export default ScrollTo;
