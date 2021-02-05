import {
  Button as ButtonOriginal,
  MenuItem as MenuItemOriginal,
  styled,
  makeStyles,
} from '@material-ui/core';
import CaretDown from '../../assets/img/caret-down.svg';
import CheckIcon from '../../assets/img/check.svg';

export const Button = styled(ButtonOriginal)({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '12px',
  textTransform: 'none',
  padding: '10px 16px',
  '&::after': {
    content: '""',
    width: '10px',
    height: '20px',
    marginLeft: '5px',
    background: `url('${CaretDown}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
});
export const MenuItem = styled(MenuItemOriginal)({
  display: 'flex',
  justifyContent: 'space-between',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#57585B',
  '&.Mui-selected': {
    background: 'transparent',
    color: '#1A75BA',
    fontWeight: 'bold',
    '&::after': {
      content: '""',
      width: '16px',
      height: '18px',
      background: `url('${CheckIcon}')`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  '.ana-date-picker-menu': {
    top: 'unset !important',
    left: 'unset !important',
  },
});

export const useStyles = makeStyles((theme) => ({
  dateRangePicker: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: '20px',
    },
    '& > a.rs-picker-toggle.rs-btn-lg': {
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
    // display: 'none',
    // position: 'absolute',
    // alignItems: 'center',
    // justifyContent: 'center',
    // left: '0px',
    // top: '0px',
    // zIndex: 7,
    // [theme.breakpoints.down('sm')]: {
    //   position: 'fixed',
    //   backgroundColor: 'rgba( 0, 0, 0, 0.6)',
    // },
  },
  dateRangePickerMenu: {
    top: 'unset !important',
    left: 'unset !important',
    '& > .rs-picker-daterange-panel': {
      '&, & *': {
        // zIndex: 7,
      },
      backgroundColor: 'white',
    },
    '& > .rs-picker-toolbar': {
      // zIndex: 7,
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
      left: 'unset !important',
      top: 'unset !important',
      height: '370px',
      width: '255px',
    },
  },
}));
