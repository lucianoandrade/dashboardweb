import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box } from '@material-ui/core';
import useStyles from './styles';

interface Props {
  navegadoresUtilizados: Array<any>;
}

const RaceChart = (props: Props) => {
  const { navegadoresUtilizados } = props
  const styles = useStyles();
  const dataBrowser = [
    {
      "browser": "Chrome",
      "Chrome": navegadoresUtilizados.filter(e => e.chave === "Chrome" ? e.valor  : 0)[0]?.valor || 0,
      "color": "#1A75BA"
    },
    {
      "browser": "Safari",
      "Safari":  navegadoresUtilizados.filter(e => e.chave === "Safari" ? e.valor : 0)[0]?.valor || 0,
      "color": "#14A0C1"
    },
    {
      "browser": "Edge",
      "Edge": navegadoresUtilizados.filter(e => e.chave === "Edge" ? e.valor : 0)[0]?.valor || 0,
      "color": "#08909E"
    },
    {
      "browser": "Firefox",
      "Firefox": navegadoresUtilizados.filter(e => e.chave === "Firefox" ? e.valor : 0)[0]?.valor || 0,
      "color": "#08909E"
    },
    {
      "browser": "Opera",
      "Opera": navegadoresUtilizados.filter(e => e.chave === "Opera" ? e.valor : 0)[0]?.valor || 0,
      "color": "#5159AC"
    },
    {
      "browser": "Netscape",
      "Netscape": navegadoresUtilizados.filter(e => e.chave === "Netscape" ? e.valor : 0)[0]?.valor || 0,
      "color": "#02CC9C"
    } 
  ]

  return (
    <Box className={styles.viewDevices}>
      <ResponsiveBar
        data={dataBrowser}
        keys={[ 'Chrome', 'Safari', 'Edge', 'Firefox', 'Opera', 'Netscape']}
        indexBy="browser"
        margin={{ top: 50, right: 40, bottom: 50, left: 80 }}
        padding={0.3}
        layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        borderColor='inhert'
        axisTop={null}
        axisRight={null}
        isInteractive={false}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: 32
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'brighter', 3 ] ] }}
        legends={[]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        enableGridY={false}
        enableGridX={true}
        defs={[
            {
              id: '1',
              type: 'patternDots',
              background: '#1A75BA',
              color: '#1A75BA',
            },
            {
              id: '2',
              type: 'patternDots',
              background: '#14A0C1',
              color: '#14A0C1',
            },
            {
              id: '3',
              type: 'patternDots',
              background: '#08909E',
              color: '#08909E',
            },
            {
              id: '4',
              type: 'patternDots',
              background: '#02CC9C',
              color: '#02CC9C',
            },
            {
              id: '5',
              type: 'patternDots',
              background: '#5159AC',
              color: '#5159AC',
            }
        ]}
        fill={[
          {
              match: {
                  id: 'Chrome'
              },
              id: '1'
          },
          {
              match: {
                  id: 'Safari'
              },
              id: '2'
          },
          {
            match: {
                id: 'IE e Edge'
            },
            id: '3'
          },
          {
            match: {
                id: 'Firefox'
            },
            id: '4'
          },
          {
            match: {
                id: 'Opera'
            },
            id: '5'
          }
        ]}         
      />
    </Box>
  );
};

export default RaceChart;
