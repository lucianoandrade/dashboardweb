import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    boxShadow: 'none',
  },

  container: {
    width: '100%',
    maxHeight: 716,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 520,
      overflowY: 'scroll',
    },
  },

  title: {
    backgroundColor: '#fff',
    paddingTop: 27,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  views: {
    paddingRight: 65,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      fontWeight: 'bold',
      paddingRight: 30,
    },
  },

  pages: {
    display: 'flex',
    paddingLeft: 20,
    cursor: 'pointer',
  },

  box: {
    width: 16,
    height: 16,
    marginRight: 12,
    borderRadius: 2,
  },
}));
