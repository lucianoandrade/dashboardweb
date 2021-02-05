import { makeStyles } from '@material-ui/core';

import headerBg from '../../assets/img/pageHeaderBG.png';

export default makeStyles((theme) => ({
  bg: {
    backgroundColor: '#fff',
  },

  header: {
    maxWidth: '100%',
    height: 131,
    background: `url('${headerBg}')`,
    backgroundRepeat: 'repeat-x',
    backgroundPositionX: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '64px 40px 0 40px',
  },

  breadCrumb: {
    background: '#FFFFFF',
    opacity: 0.85,
    borderRadius: '4px',
    padding: '8px 12px',
    '& > *': {
      display: 'inline-block',
      color: '#57585B',
      '&:last-child': {
        color: '#57585B',
        fontWeight: 700,
      },
    },
    '& > svg': {
      margin: '0px 4px',
    },
  },

  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '24px 40px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },

  graphPage: {
    display: 'inline-flex',
    flexDirection: 'column',
    maxWidth: 1200,
    width: '100%',
    height: 460,
    border: '1px solid #DBE5ED',
    boxShadow: '0px 0px 4px #FFFFFF, 0px 0px 8px rgba(0, 0, 0, 0.12)',
    boxSizing: 'border-box',
    borderRadius: 4,
    backgroundColor: '#FFF',
    [theme.breakpoints.down('sm')]: {
      padding: '0 20px',
      overflowY: 'hidden',
      overflowX: 'auto',
      border: 'none',
      boxShadow: 'none',
      borderRadius: 0,
      height: 340,
      marginTop: 0,
    },
  },

  viewPage: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 1200,
    width: '100%',
    height: 716,
    border: '1px solid #DBE5ED',
    boxShadow: '0px 0px 4px #FFFFFF, 0px 0px 8px rgba(0, 0, 0, 0.12)',
    boxSizing: 'border-box',
    borderRadius: 4,
    marginTop: 24,
    backgroundColor: '#FFF',
    [theme.breakpoints.down('sm')]: {
      border: 'none',
      boxShadow: 'none',
      borderRadius: 0,
    },
  },

  detail: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      margin: '24px 0 0 20px',
    },
  },

  text: {
    marginRight: 20,
    color: '#57585B',
    fontSize: 14,
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },

  viewPageTitle: {
    display: 'flex',
    alignItems: 'center',
    height: 56,
    marginLeft: 20,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      height: 'auto',
      marginBottom: 4,
    },
  },

  viewPageTitle2: {
    display: 'flex',
    alignItems: 'center',
    height: 56,
    marginLeft: 20,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  line: {
    width: '100%',
    height: 10,
    marginTop: -10,
    background:
      'linear-gradient(180deg, rgba(219, 229, 237, 0) 0%, rgba(219, 229, 237, 0.4) 100%)',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  viewPages: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '0 20px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },

  top: {
    marginTop: 30,
    [theme.breakpoints.down('sm')]: {
      marginTop: 15,
    },
  },
}));
