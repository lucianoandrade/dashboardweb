import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  card: {
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.12), 0px 0px 4px #FFFFFF',
    border: '1px solid #DBE5ED',
    '& > :last-child': {
      paddingBottom: '0px',
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  cardHeader: {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    '& span': {
      /* H4 */
      fontFamily: 'Source Sans Pro',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '25px',
      /* Dark Blue */
      color: '#1A2C3B',
    },
  },
  cardHeaderButton: {
    '& span': {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '18px',
      color: '#14A0C1',
    },
    '& button': {
      padding: '0px 10px',
      marginTop: '10px',
      '&:first-child': {
        borderRight: '#DBE5ED',
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: '3px',
      },
    },
    color: '#14A0C1',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      '& > *': {
        width: '100%',
      },
    },
  },
  cardEndButton: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height: '47px',
    marginTop: '20px',
    '& > .gradient': {
      width: '100%',
      height: '10px',
      background:
        'linear-gradient(180deg, rgba(219, 229, 237, 0) 0%, rgba(219, 229, 237, 0.4) 100%)',
      transform: 'rotate(-180deg)',
    },
    '& > .divisor': {
      display: 'inline-block',
      width: '1px',
      height: 'inherit',
      backgroundColor: '#DBE5ED',
      marginTop: '-10px',
    },
    '& > button': {
      marginTop: '-10px',
      // fontFamily: 'Source Sans Pro',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '18px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      color: '#14A0C1',
    },
  },
  content: {
    display: 'grid',
    padding: '0px',
    boxShadow: '5px',
    flexDirection: 'row',
    justifyContent: 'stretch',
    gridTemplateColumns: '400px auto 280px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '300px auto 310px',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
    },
  },
  verticalContent: {
    gridTemplateColumns: '1fr',
  },
  headerDivision: {
    height: '10px',
    marginTop: '-10px',
    width: '100%',
    background:
      'linear-gradient(180deg, rgba(219, 229, 237, 0) 0%, rgba(219, 229, 237, 0.4) 100%);',
  },
  charts: {
    display: 'grid',
    gridTemplateColumns: '1px 1fr 1px 1fr',
    '& .divisor': {
      display: 'block',
      margin: '0px',
      padding: '0px',
      backgroundColor: '#DBE5ED',
      height: '100%',
      width: '1px',
    },
    '& > *': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'stretch',
      '& > *': {
        width: '224px',
      },
      '& .divisor': {
        height: '1px',
        width: '100%',
        marginBottom: '20px',
      },
    },
  },
  verticalCharts: {
    gridTemplateColumns: '1fr',
    '& .divisor': {
      height: '1px',
      width: '100%',
      marginBottom: '20px',
    },
  },
}));
