import React from 'react';
import { ResponsiveBar, BarExtendedDatum, BarDatumWithColor } from '@nivo/bar';

import formatter from '../../util/moneyFormatter';

interface ChartData {
  id: string;
  value: number;
}

interface ChartProps {
  data: Array<ChartData>;
  displayData: Array<number>;
  monetary?: boolean;
}

const renderTooltip: (
  displayData: Array<number>,
  monetary?: boolean
) => React.StatelessComponent<BarExtendedDatum & BarDatumWithColor> = (
  displayData,
  monetary
) => (data) => (
  <div
    style={{
      margin: '0px',
      overflow: 'hidden',
      display: 'block',
      width: monetary ? 'min-content' : 'max-content',
      lineBreak: 'normal',
    }}
  >
    <div
      style={{
        display: 'inline-block',
        height: '10px',
        width: '10px',
        backgroundColor: data.color,
        margin: '0px',
      }}
    />
    {` ${data.indexValue}: ${
      monetary
        ? formatter.format(displayData[data.index])
        : displayData[data.index]
    }`}
  </div>
);

const BarChart: React.FC<ChartProps> = (props: ChartProps) => {
  const { data, monetary, displayData } = props;
  const color = { colorBy: 'value' };
  return (
    <ResponsiveBar
      data={data}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      padding={0.3}
      borderRadius={8}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableLabel={false}
      animate
      motionStiffness={90}
      motionDamping={15}
      enableGridY={false}
      colors={['#7DE315', '#14A0C1', '#F1C422', '#5159AC']}
      tooltip={renderTooltip(displayData, monetary)}
      {...color}
    />
  );
};

export default BarChart;
