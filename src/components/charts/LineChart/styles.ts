import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  header: {
    width: '100%',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      minWidth: 890,
    },
  },
  graphDevice: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0 40px 5px 0',
  },
  device: {
    marginBottom: 16,
    display: 'flex',
    fontSize: 14,
  },
  
  1: {
    width: 20,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
    backgroundColor: '#1A75BA',
  },

  2: {
    width: 20,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
    backgroundColor: '#14A0C1',
  },

  3: {
    width: 20,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
    backgroundColor: '#02CC9C',
  },
}));
