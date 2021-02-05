import React from "react";
import FixedBox from "./FixedBox";

function XLabels({ labels, width, labelsVisibility, squares, height, yWidth }) {
  return (
    <div style={{ display: "flex" }}>
      <FixedBox width={yWidth} />
      {labels.map((x, i) => (
        <div
          key={i}
          style={{
            flex: squares ? "none" : 1,
            textAlign: "center",
            width: squares ? `${height + 1}px` : width,
            visibility:
              labelsVisibility && !labelsVisibility[i] ? "hidden" : "visible",
          }}
        >
          {x}
        </div>
      ))}
    </div>
  );
}

XLabels.defaultProps = {
  labelsVisibility: null,
  squares: false,
  height: 30,
};

export default XLabels;

