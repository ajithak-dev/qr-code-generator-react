import React from "react";
import PropTypes from "prop-types";

export const Check = (props) => {
  return <div>{props.name}</div>;
};

Check.propTypes = {
  name: PropTypes.string,
};
