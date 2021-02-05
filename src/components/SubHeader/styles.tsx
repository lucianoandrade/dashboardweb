import { makeStyles } from '@material-ui/core';

import headerBG from '../../assets/img/pageHeaderBG.png';

export default makeStyles((theme) => ({
  // Header Styles
  headerBox: {
    background: `url("${headerBG}")`,
    backgroundColor: '#0001',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      '& > *': {
        flexGrow: 1,
      },
    },
  },
  headerContainer: {
    // height: 'inherit',
    [theme.breakpoints.down('sm')]: {
      margin: '0px',
      padding: '0px',
    },
  },
  headerItemsLayout: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 'inherit',
    flexDirection: 'column',
  },
  contentRow: {
    display: 'flex',
    alignItems: 'flex-end',
    margin: '62px 0px 32px',
    '& > h4': {
      color: '#1A2C3B',
      marginRight: '16px',
      fontFamily: 'Source Sans Pro',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '32px',
      lineHeight: '40px',
      display: 'flex',
      alignItems: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  sendMessage: {
    flexGrow: 1,
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
        color: '#1A2C3B',
      },
    },
    '& > svg': {
      margin: '0px 4px',
    },
  },
  navBar: {
    width: '100%',
    height: '56px',
    borderRadius: '4px 4px 0 0',
    borderBottom: 'solid 1px lightgray',
    backgroundColor: 'rgba(255, 255, 255, 85%)',
    display: 'flex',
    '& .MuiTabs-flexContainer': {
      height: '100%',
    },
    '& .MuiTab-root': {
      textTransform: 'uppercase',
      // fontFamily: 'Source Sans Pro',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '15px',
      lineHeight: '19px',
      letterSpacing: '0.05em',
      color: '#1A2C3B',
    },
    '& .Mui-selected': {
      backgroundColor: 'white',
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: '0px',
      '& .MuiTabs-root, & .MuiTabs-flexContainer': {
        width: '100%',
        justifyContent: 'stretch',
      },
      '& .MuiTab-root': {
        width: '50%',
      },
    },
  },
  default: {},
  operators: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '36px',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '0px',
    },
  },
  firstTabSelected: {
    borderTopLeftRadius: '4px',
    [theme.breakpoints.down('sm')]: {
      borderRadius: '0px',
    },
  },
}));
