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
  },

  title: {
    backgroundColor: '#fff',
    paddingTop: 27,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  title2: {
    width: 220,
    textAlign: 'center',
    backgroundColor: '#fff',
    paddingTop: 27,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  views: {
    textAlign: 'center',
  },

  pages: {
    display: 'flex',
    paddingLeft: 20,
  },

  box: {
    width: 16,
    height: 16,
    marginRight: 12,
    borderRadius: 2,
  },

  detail: {
    display: 'flex',
    justifyContent: 'center',
  },

  bold: {
    fontWeight: 700,
    marginRight: 4,
  },
}));
