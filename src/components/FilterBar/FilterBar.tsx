import React, { ChangeEvent } from 'react';
import { DateRangePicker, DateRangePickerProps } from 'rsuite';
import {
  Box,
  Container,
  TextField,
  MenuItem,
  ButtonGroup,
  Button,
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';

import rangePickerConfig from './rangePickerConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '24px 0px',
    '& .MuiInputBase-root': {
      borderRadius: '2px',
    },
    '& > .MuiBox-root': {
      display: 'flex',
      '& > *': {
        [theme.breakpoints.up('md')]: {
          marginRight: '20px',
        },
      },
    },
    '& .MuiSelect-root': {
      width: '280px',
      fontSize: '14px',
      lineHeight: '20px',
      [theme.breakpoints.only('md')]: {
        width: 'auto',
      },
    },
    '& .MuiButton-root': {
      borderRadius: '0px',
      boxShadow: 'none',
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

interface FilterBarProps {
  currentTab: string;
  tabsWithOptions: Array<string>;
  tabOptions: any;
  currentTabOption: string;
  selectableDateIntervals: data[];
  selectableParams: data[];
  currentParam: string;
  currentDateInterval: string;
  customDateInterval: DateInterval;
  dateIntervalHandler(event: ChangeEvent<HTMLInputElement>): void;
  changeParamHandler(param: string): void;
  customDateIntervalHandler(data: DateInterval): void;
  changeViewOptions(data: string): void;
}

export interface data {
  key: string;
  value: string;
}

export default (props: FilterBarProps) => {
  const {
    currentTab,
    currentParam,
    selectableParams,
    currentDateInterval,
    selectableDateIntervals,
    customDateInterval,
    tabsWithOptions,
    tabOptions,
    currentTabOption,
    dateIntervalHandler,
    changeParamHandler,
    customDateIntervalHandler,
    changeViewOptions,
  } = props;
  const styles = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const rangePickerProps: DateRangePickerProps = rangePickerConfig(
    customDateInterval,
    customDateIntervalHandler,
    mobile,
    styles.dateRangePicker,
    styles.dateRangePickerMenu
  );
  return (
    <>
      <Container className={styles.root}>
        <Box>
          {tabsWithOptions.includes(currentTab) ? (
            <TextField
              select
              variant='outlined'
              size='small'
              value={currentTabOption}
              onChange={(e) => changeViewOptions(e.target.value)}
            >
              {tabOptions[currentTab].map((item: any) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.key}
                </MenuItem>
              ))}
            </TextField>
          ) : null}
          <TextField
            select
            variant='outlined'
            size='small'
            value={currentDateInterval}
            onChange={dateIntervalHandler}
          >
            {selectableDateIntervals.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.key}
              </MenuItem>
            ))}
          </TextField>
          {currentDateInterval === 'custom' ? (
            <DateRangePicker {...rangePickerProps} />
          ) : null}
        </Box>
        <ButtonGroup color='primary' variant='outlined' fullWidth={mobile}>
          {selectableParams.map((item) => (
            <Button
              key={item.value}
              variant={item.value === currentParam ? 'contained' : 'outlined'}
              onClick={() => changeParamHandler(item.value)}
            >
              {item.key}
            </Button>
          ))}
        </ButtonGroup>
      </Container>
      <div
        id='rs-date-range-picker-container'
        className={styles.dateRangePickerContainer}
      />
    </>
  );
};
