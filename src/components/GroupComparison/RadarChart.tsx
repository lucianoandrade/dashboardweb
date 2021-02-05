import React from 'react';
import { ResponsiveRadar, RadarProps } from '@nivo/radar';

interface RadarChartProps {
  groups: Array<GroupComparison.GroupData>;
}

export const maxFourGroups = (
  groups: Array<GroupComparison.GroupData>
): Array<GroupComparison.GroupData> => groups.slice(0, 4);

const generateData = (groups: Array<GroupComparison.GroupData>) => {
  const actuations = groups.map((g, i) => [
    g.name,
    g.actuation / g.goal.actuation,
  ]);
  const positiveActuations = groups.map((g, i) => [
    g.name,
    g.positiveActuation / g.goal.positiveActuation,
  ]);
  const promises = groups.map((g, i) => [g.name, g.promises / g.goal.promises]);
  const promisesValue = groups.map((g, i) => [
    g.name,
    g.promisesValue / g.goal.promisesValue,
  ]);

  return { actuations, positiveActuations, promises, promisesValue };
};

const generateDataset = (
  { actuations, positiveActuations, promises, promisesValue }: any,
  compact = false
) => [
  {
    metric: compact ? 'AT' : 'Acionamento Total',
    ...Object.fromEntries(actuations),
  },
  {
    metric: compact ? 'AP' : 'Acionamento Positivo',
    ...Object.fromEntries(positiveActuations),
  },
  {
    metric: compact ? 'QP' : 'Qtd. de Promessas',
    ...Object.fromEntries(promises),
  },
  {
    metric: compact ? 'VP' : 'Valor das Promessas',
    ...Object.fromEntries(promisesValue),
  },
];

const commomProps: RadarProps = {
  data: [],
  keys: [],
  indexBy: 'metric',
  margin: { top: 70, right: 80, bottom: 65, left: 80 },
  curve: 'linearClosed',
  borderWidth: 2,
  gridLevels: 3,
  gridShape: 'linear',
  gridLabelOffset: 32,
  enableDots: true,
  dotSize: 5,
  dotColor: { from: 'color', modifiers: [] },
  dotBorderWidth: 0,
  dotBorderColor: { from: 'color' },
  enableDotLabel: false,
  dotLabel: 'value',
  dotLabelYOffset: -12,
  fillOpacity: 0.25,
  blendMode: 'multiply',
  animate: true,
  motionStiffness: 90,
  motionDamping: 15,
  isInteractive: false,
  legends: [
    {
      anchor: 'left',
      direction: 'column',
      translateX: -50,
      translateY: -40,
      itemWidth: 80,
      itemHeight: 20,
      itemTextColor: '#999',
      symbolSize: 12,
      symbolShape: 'square',
    },
  ],
};

export const RadarChart: React.FC<RadarChartProps> = (
  props: RadarChartProps
) => {
  let { groups } = props;
  groups = maxFourGroups(groups);
  const groupList = groups.map((g) => g.name);
  const data = generateDataset(generateData(groups));
  return (
    <ResponsiveRadar
      {...commomProps}
      data={data}
      keys={groupList}
      colors={['#7DE315', '#14A0C1', '#F1C422', '#5159AC']}
    />
  );
};
export const RadarChartMobile: React.FC<RadarChartProps> = (
  props: RadarChartProps
) => {
  let { groups } = props;
  groups = maxFourGroups(groups);
  const groupList = groups.map((g) => g.name);
  const data = generateDataset(generateData(groups), true);
  return (
    <ResponsiveRadar
      {...commomProps}
      data={data}
      keys={groupList}
      legends={[]}
      colors={['#7DE315', '#14A0C1', '#F1C422', '#5159AC']}
    />
  );
};
