import React from "react";

const FixedBox = ({ children, width }) => {
  return <div style={{ flex: `0 0 ${width}px` }}> {children} </div>;
};

FixedBox.defaultProps = {
  children: " ",
};

export default FixedBox;

