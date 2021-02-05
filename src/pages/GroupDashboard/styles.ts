import { makeStyles } from '@material-ui/core';

import bgImage from '../../assets/img/pageHeaderBG.png';

export default makeStyles((theme) => ({
  // Header Styles
  headerBox: {
    height: '187px',
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  headerContainer: {
    height: 'inherit',
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
    '& > h4': {
      color: 'white',
      flexGrow: 1,
      marginTop: '62px',
      fontFamily: 'Source Sans Pro',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '32px',
      lineHeight: '40px',
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
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
      marginTop: '36px',
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
  firstTabSelected: {
    borderTopLeftRadius: '4px',
    [theme.breakpoints.down('sm')]: {
      borderRadius: '0px',
    },
  },
  // Body styles
  bodyContainer: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  controlsBox: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '24px 0px',
    '& .MuiInputBase-root': {
      borderRadius: '2px',
    },
    '& > .MuiBox-root': {
      display: 'flex',
      flexDirection: 'row',
    },
    '& .MuiSelect-root': {
      [theme.breakpoints.only('md')]: { minWidth: '100px' },
      minWidth: '280px',
      fontSize: '14px',
      lineHeight: '20px',
    },
    '& .MuiButton-root': {
      borderRadius: '0px',
      boxShadow: 'none',
    },
    [theme.breakpoints.up('md')]: {
      '& > *:first-child > *': {
        margin: '0px 10px',
        '&:first-child': {
          marginLeft: '0px',
        },
        '&:last-child': {
          marginRight: '0px',
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '4px',
      flexDirection: 'column-reverse',
      '& > :first-child': {
        flexDirection: 'column',
        '& > *': {
          marginBottom: '20px',
        },
      },
      '& > :last-child': {
        marginBottom: '20px',
      },
    },
  },
  dateRangePicker: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: '20px',
    },
    '& > a.rs-picker-toggle.rs-btn-lg': {
      minWidth: '280px',
      [theme.breakpoints.only('md')]: { minWidth: '100px' },
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '20px',
      color: '#1A75BA',
      borderRadius: '2px',
      height: '41px',
      border: '1px solid rgba( 0, 0, 0, 0.23)',
      '&:active, &:hover': {
        border: '1px solid #1A75BA',
        borderRadius: '2px',
      },
    },
    border: 'none',
    height: '41px',
    borderRadius: '2px',
    background: '#FFFFFF',
    boxSizing: 'border-box',
  },
  dateRangePickerContainer: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    left: '0px',
    top: '0px',
    zIndex: 7,
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      backgroundColor: 'rgba( 0, 0, 0, 0.6)',
    },
  },
  dateRangePickerMenu: {
    '& > .rs-picker-daterange-panel': {
      '&, & *': {
        zIndex: 7,
      },
      backgroundColor: 'white',
    },
    '& > .rs-picker-toolbar': {
      zIndex: 7,
      backgroundColor: 'white',
    },
    '& .rs-calendar-table-cell-content': {
      borderRadius: '15px',
    },
    '& .rs-calendar-table-cell-selected .rs-calendar-table-cell-content': {
      background: '#1A75BA',
    },
    '& .rs-picker-toolbar-right-btn-ok': {
      background: '#1A75BA',
      border: '1px solid #0961A3',
      boxSizing: 'border-box',
      borderRadius: '0px',
    },
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      left: '0px !important',
      top: '0px !important',
      height: '370px',
      width: '255px',
    },
  },
}));
