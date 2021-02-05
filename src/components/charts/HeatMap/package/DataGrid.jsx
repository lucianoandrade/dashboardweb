import React from "react";

const DataGrid = ({
  xLabels,
  yLabels,
  data,
  // xLabelWidth,
  // yLabelWidth,
  // background,
  height,
  // yLabelTextAlign,
  // unit,
  // displayYLabels,
  onClick,
  cursor,
  squares,
  // cellRender,
  // cellStyle,
}) => {
  const flatArray = data && data.reverse().reduce((i, o) => [...o, ...i], []);
  const max = Math.max(...flatArray);
  const min = Math.min(...flatArray);
  return (
    <div>
      {yLabels.reverse().map((y, yi) => (
        <div key={yi} style={{ display: "flex" }}>
          {xLabels.map((x, xi) => {
            const value = data.length > 0 ? data[yi][xi] : 0;
            const style = Object.assign(
              {
                cursor: `${cursor}`,
                margin: "1px 1px 0 0",
                height,
                width: squares ? `${height}px` : undefined,
                flex: squares ? "none" : 1,
                textAlign: "center",
                background: value ? `rgba(26, 117, 186, ${1 - (max - value) / (max - min)})` : '#E6EAF0'
              },
            );
            return (
              <div
                onClick={onClick.bind(this, xi, yi)}
                key={`${xi}_${yi}`}
                style={style}
                id={`${y}_${value}`}
                title={`${y} ${value} Usuários`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};


DataGrid.defaultProps = {
  displayYLabels: true,
  cursor: "",
  onClick: () => { },
  squares: false,
  title: (value, unit) => (value || value === 0) && `${value} ${unit}`
};

export default DataGrid;
