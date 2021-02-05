import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
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
