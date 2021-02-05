import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  bg: {
    backgroundColor: '#fff',
  },

  header: {
    width: '100%',
    height: 'auto',
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

  mainInput: {
    maxWidth: 280,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      padding: '0 20px',
      marginTop: 24,
    },
  },

  graphDevicesBox: {
    display: 'inline-flex',
    maxWidth: 1200,
    width: '100%',
    height: 421,
    border: '1px solid #DBE5ED',
    boxShadow: '0px 0px 4px #FFFFFF, 0px 0px 8px rgba(0, 0, 0, 0.12)',
    boxSizing: 'border-box',
    borderRadius: 4,
    marginTop: 24,
    backgroundColor: '#FFF',
    [theme.breakpoints.down('sm')]: {
      padding: '0 20px',
      overflowY: 'hidden',
      overflowX: 'auto',
      border: 'none',
      boxShadow: 'none',
      borderRadius: 0,
    },
  },

  viewDevice: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 1200,
    width: '100%',
    height: 673,
    border: '1px solid #DBE5ED',
    boxShadow: '0px 0px 4px #FFFFFF, 0px 0px 8px rgba(0, 0, 0, 0.12)',
    boxSizing: 'border-box',
    borderRadius: 4,
    marginTop: 24,
    backgroundColor: '#FFF',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 550,
      border: 'none',
      boxShadow: 'none',
      borderRadius: 0,
    },
  },

  viewDeviceTitle: {
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

  viewDevices: {
    width: '100%',
    display: 'flex',
    height: 560,
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '0 20px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
}));
