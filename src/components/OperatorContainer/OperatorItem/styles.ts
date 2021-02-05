import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  avatarOnline: {
    height: '16px',
    width: '16px',
    borderRadius: '50%',
    backgroundColor: '#4CBE22',
    boxShadow: 'inset 0px 3px 4px rgba(0, 0, 0, 0.18)',
  },
  avatarOffilne: {
    height: '16px',
    width: '16px',
    borderRadius: '50%',
    backgroundColor: '#C73228',
    boxShadow: 'inset 0px 3px 4px rgba(0, 0, 0, 0.18)',
  },
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
  cardHeaderAction: {
    marginTop: '0px',
    alignSelf: 'center',
    '& span': {
      fontSize: '14px',
      color: '#14A0C1',
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
  headerDivision: {
    height: '10px',
    marginTop: '-10px',
    width: '100%',
    background:
      'linear-gradient(180deg, rgba(219, 229, 237, 0) 0%, rgba(219, 229, 237, 0.4) 100%);',
  },
  dividerlist: {
    height: '352px',
    width: '1px',
    backgroundColor: '#DBE5ED',
    marginLeft: '4px',
    marginRight: '4px',
    [theme.breakpoints.down('md')]: {
      height: '1px',
      width: '100%',
      margin: theme.spacing(2, 0, 2, 0),
    },
  },
  dividerhistory: {
    height: '1px',
    width: '100%',
    backgroundColor: '#DBE5ED',
    margin: theme.spacing(2, 0, 2, 0),
  },
  history: {
    maxWidth: '241px',
    flexDirection: 'column',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: null,
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: null,
    },
  },
  infoContainer: {
    width: '236px',
    marginRight: '32px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: '0px',
    },
  },
  RadialContainer: {
    marginLeft: '12px',
    width: '300px',
    [theme.breakpoints.down('md')]: {
      margin: '0px',
    },
  },
  goalsContainer: {
    flexGrow: 1,
    width: '570px',
    marginTop: '19px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  TimeBarBottom: {
    width: '100%',
  },
  TimeBarHistory: {
    padding: '0px 23px 23px',
    width: '100%',
  },
}));
