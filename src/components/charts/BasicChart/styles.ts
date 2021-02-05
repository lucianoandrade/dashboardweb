import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  header: {
    width: '100%',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      minWidth: 890,
    },
  },
}));
