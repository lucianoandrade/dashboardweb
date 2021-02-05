import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
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
                  position: 'absolute',
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
                  //  marginLeft: 'calc(225px - 450px)',
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
                  [theme.breakpoints.up('lg')]: {
                    left: 'initial',
                  },
                  [theme.breakpoints.between('sm', 'lg')]: {
                    left: 'unset !important',
                    right: '10vw',
                  },
                },
              }));
