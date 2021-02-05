import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  container: {
    paddingBottom: '60px',
  },
  // Charts Styles
  charts: {
    height: '406px',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    marginBottom: '24px',
    // Figma
    background: '#FFFFFF',
    border: '1px solid #DBE5ED',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.12), 0px 0px 4px #FFFFFF',
    borderRadius: '4px',
  },
  radarChart: {
    height: '400px',
    // Chegar aos elementos do tooltip do nivo/radar
    '& > div > div > div *': {
      marginBottom: '0px',
    },
  },
  barChartOuterContainer: {},
  barChartInnerContainer: {
    background: 'rgba(219, 229, 237, 0.15)',
    boxShadow:
      'inset 3px 3px 3px rgba(126, 157, 182, 0.15), inset -4px -4px 4px rgba(255, 255, 255, 0.2)',
    borderRadius: '18px 0px 20px',
    width: '441px',
    height: '382px',
    marginLeft: '24px',
    marginTop: '24px',
    marginBottom: '0px',
    paddingTop: '56px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
  },
  barChartUnit: {
    paddingTop: '10px',
    width: '153px',
    margin: 'auto',
  },
  chart: {
    height: '100px',
  },
  barChartMobile: {
    height: '224px',
    overflow: 'hidden',
  },
}));
