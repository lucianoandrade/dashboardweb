import { makeStyles } from '@material-ui/core';

import bgImage from '../../assets/img/logoSectionBg.png';

export default makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      backgroundImage: `url('${bgImage}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    },
    [theme.breakpoints.down('sm')]: {
      backgroundImage: `url('${bgImage}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    zIndex: 1,
    borderRadius: '4px',
    maxWidth: '720px',
    margin: 'auto',
  },
  logoContainer: {
    [theme.breakpoints.up('md')]: {
      backgroundImage: `url('${bgImage}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      alignItems: 'center',
    },
    display: 'none',
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
  },
  logoFilter: {
    background: 'linear-gradient(180deg, #3A3A3A 0%, #2B2B2B 100%)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    display: 'flex',
    opacity: 0.93,
    '& > img': {
      width: '70%',
    },
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
  },
  paper: {
    [theme.breakpoints.down('sm')]: {
      background: 'linear-gradient(180deg, #3A3A3AF0 0%, #2B2B2BF0 100%)',
      paddingTop: '0px',
      borderRadius: '4px',
    },
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
  },
  logo: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    padding: theme.spacing(8, 4),
  },
  button: {
    boxShadow: 'none',
    borderRadius: '0px',
    height: '52px',
    background: '#1A75BA',
    border: '1px solid #0961A3',
  },
  shadow: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    position: 'absolute',
    zIndex: 0,
    top: '-100vh',
    right: '0px',
    height: '200vh',
    width: '100vw',
    background: 'rgb(0, 0, 0, 0.2)',
  },
}));
