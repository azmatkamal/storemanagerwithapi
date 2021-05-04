import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    // eslint-disable-next-line
    // const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>&copy; {new Date().getFullYear()} The Teams.</span>
        <span className="ml-auto">
          Developed by <Link to={"https://azmatkamal.com"}>Azmat Kamal</Link>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
