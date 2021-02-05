import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  container: {
    border: '1px solid #DBE5ED',
    boxSizing: 'border-box',
    boxShaRw: '0px 0px 8px rgba(0, 0, 0, 0.12), 0px 0px 4px #FFFFFF',
    borderRadius: '4px',
    marginBottom: '25px',
  },
  chart: {
    height: '400px',
    padding: '20px',
    '& .apexcharts-legend-series': {
      display: 'flex',
      alignItems: 'center',
      '& > span:first-child': {
        marginRight: '12px',
      },
    },
  },
  data: {
    padding: '20px',
    backgroundColor: 'white',
  },
  dataHeader: {
    display: 'flex',
    height: '57px',
    alignItems: 'center',
    borderRadius: '4px',
    padding: '0px 20px',
    backgroundColor: 'white',
  },
  headerText: {
    fontFamily: 'Source Sans Pro',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '18px',
    color: '#1A2C3B',
  },
  divisor: {
    display: 'block',
    marginTop: '-11px',
    height: '11px',
    background:
      'linear-gradient(180deg, rgba(219, 229, 237, 0) 0%, rgba(219, 229, 237, 0.4) 100%)',
  },
  barChartMobile: {
    height: '370px',
    width: '200vw',
    overflowY: 'hidden',
  },
  color: {
    '& > :first-child': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&::before': {
        content: '""',
        display: 'inline-block',
        height: '16px',
        width: '16px',
        background: '#A0AAB5',
        borderRadius: '2px',
        marginRight: '12px',
      },
    },
    '&:nth-child(2) > :first-child::before': {
      background: '#7DE315',
    },
    '&:nth-child(3) > :first-child::before': {
      background: '#14A0C1',
    },
    '&:nth-child(4) > :first-child::before': {
      background: '#F1C422',
    },
    '&:nth-child(5) > :first-child::before': {
      background: '#1A75BA',
    },
  },
}));
