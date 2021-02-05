import React from "react";
import XLabels from "./XLabels";
import DataGrid from "./DataGrid";

function HeatMap({
  xLabels,
  yLabels,
  data,
  background,
  height,
  xLabelWidth,
  yLabelWidth,
  xLabelsLocation,
  yLabelTextAlign,
  xLabelsVisibility,
  unit,
  displayYLabels,
  onClick,
  squares,
  cellRender,
  cellStyle,
}) {
  let cursor = "";
  if (onClick !== undefined) {
    cursor = "pointer";
  }
  const xLabelsEle = (
    <XLabels
      labels={xLabels}
      width={xLabelWidth}
      labelsVisibility={xLabelsVisibility}
      height={height}
      squares={squares}
      yWidth={yLabelWidth}
    />
  );
  return (
    <div>
      {xLabelsLocation === "top" && xLabelsEle}
      <DataGrid
        {...{
          xLabels,
          yLabels,
          data,
          background,
          height,
          xLabelWidth,
          yLabelWidth,
          yLabelTextAlign,
          unit,
          xLabelsLocation,
          displayYLabels,
          onClick,
          cursor,
          squares,
          cellRender,
          cellStyle,
        }}
      />
      {xLabelsLocation === "bottom" && xLabelsEle}
    </div>
  );
}

HeatMap.defaultProps = {
  background: "#329fff",
  height: 30,
  xLabelWidth: 60,
  yLabelWidth: 40,
  yLabelTextAlign: "right",
  unit: "",
  xLabelsLocation: "top",
  xLabelsVisibility: null,
  displayYLabels: true,
  onClick: undefined,
  squares: false,
  cellRender: () => null,
  cellStyle: (background, value, min, max) => ({
    background,
    opacity: (value - min) / (max - min) || 0,
  })
};

export default HeatMap;
