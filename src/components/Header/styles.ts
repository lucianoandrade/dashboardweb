import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: 'center',
    maxHeight: '60px',
    alignItems: 'baseline',
    [theme.breakpoints.down('sm')]: {
      height: '56px',
    },
  },
  backToolbar: {
    justifyContent: 'center',
    maxHeight: '60px',
    alignItems: 'baseline',
    [theme.breakpoints.down('md')]: {
      margin: '0px',
      padding: '0px',
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      height: '60px',
      justifyContent: 'left',
      padding: '0px',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export default useStyles;
