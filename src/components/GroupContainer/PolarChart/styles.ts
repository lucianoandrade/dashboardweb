import { makeStyles } from '@material-ui/core';

const getPosition = (angle: number, factor = 85) => ({
  bottom: `${Math.sin(angle) * factor}px`,
  left: `${Math.cos(angle) * factor}px`,
});

export default makeStyles((theme) => ({
  root: {
    height: '201px',
    width: '201px',
    // backgroundColor: 'black',
  },
  graph: {},
  labels: {
    position: 'absolute',
    margin: '0px',
    marginTop: '4px',
    padding: '0px',
    height: '1px',
    width: '1px',
    '& > div': {
      position: 'absolute',
      height: '1px',
      width: '1px',
      fontFamily: 'Source Sans Pro',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '11px',
      lineHeight: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#57585B',
    },
    '& > div:nth-child(1)': getPosition(0.9), // primeira label: AP
    '& > div:nth-child(2)': getPosition(5.95), // última label: PR
    '& > div:nth-child(3)': getPosition(4.7, 80), // quarta label: VP
    '& > div:nth-child(4)': getPosition(3.45), // terceira label: PG
    '& > div:nth-child(5)': getPosition(2.2), // segunda label: PxA
  },
}));
