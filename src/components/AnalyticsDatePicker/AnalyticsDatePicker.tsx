import { Divider, Menu, useMediaQuery, useTheme } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import rangePickerConfig from '../FilterBar/rangePickerConfig';
import { Button, MenuItem, useStyles } from './styles';

const options: { [key in IntervalTypes]: string } = {
  day: 'Hoje',
  week: 'Últimos 7 dias',
  month: 'Últimos 30 dias',
  custom: 'Personalizado',
};
export interface AnalyticsDatePickerProps {
  global?: boolean;
  onChange(dates: DateInterval): void;
  values: DateInterval;
  selected: IntervalTypes;
  setSelected(index: IntervalTypes): void;
  style?: React.CSSProperties;
}

const AnalyticsDatePicker: React.FC<AnalyticsDatePickerProps> = ({
  global,
  onChange,
  values,
  selected,
  setSelected,
  style,
}: AnalyticsDatePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const [custom, setCustom] = React.useState(false);
  const styles = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const anchorRef = React.useRef(null);
  return (
    <>
      <Button
        ref={anchorRef}
        onClick={() => setOpen((s) => !s)}
        variant={global ? 'outlined' : undefined}
        style={style}
      >
        {selected === 'custom'
          ? `${moment(values.start).format('DD/MM/YYYY')} a ${moment(
              values.end
            ).format('DD/MM/YYYY')}`
          : options[selected]}
      </Button>
      <Menu
        id='simple-menu'
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: global ? 'bottom' : 'top',
          horizontal: global ? 'right' : 'left',
        }}
        transformOrigin={{
          horizontal: global ? 'right' : 'left',
          vertical: global ? 'top' : 'bottom',
        }}
        disablePortal
        PaperProps={{
          style: {
            background: '#FFFFFF',
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.3)',
            borderRadius: '4px',
          },
        }}
        MenuListProps={{ style: { width: '254px' } }}
        elevation={0}
      >
        <MenuItem
          selected={selected === 'day'}
          onClick={() => {
            setCustom(false);
            setOpen(false);
            setSelected('day');
            onChange({
              start: moment().startOf('day'),
              end: moment().endOf('day'),
            });
          }}
        >
          {options.day}
        </MenuItem>
        <MenuItem
          selected={selected === 'week'}
          onClick={() => {
            setCustom(false);
            setOpen(false);
            setSelected('week');
            onChange({ start: moment().subtract(7, 'd'), end: moment() });
          }}
        >
          {options.week}
        </MenuItem>
        <MenuItem
          selected={selected === 'month'}
          onClick={() => {
            setCustom(false);
            setOpen(false);
            setSelected('month');
            onChange({ start: moment().subtract(30, 'd'), end: moment() });
          }}
        >
          {options.month}
        </MenuItem>
        <Divider style={{ margin: '8px 0', background: '#DBE5ED' }} />
        <MenuItem
          selected={selected === 'custom'}
          onClick={() => {
            setSelected('custom');
            setCustom(true);
          }}
        >
          {options.custom}
        </MenuItem>
        {custom && (
          <DateRangePicker
            {...rangePickerConfig(
              values,
              (data: DateInterval) => {
                onChange(data);
                setOpen(false);
              },
              mobile,
              styles.dateRangePicker,
              styles.dateRangePickerMenu
            )}
            style={{ margin: '16px 16px 8px' }}
          />
        )}
      </Menu>
      <div
        style={{
          display: 'none',
          position: 'fixed',
          top: '0px',
          left: '0px',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1301,
          background: '#0005',
        }}
        id='rs-date-range-picker-container'
        className={styles.dateRangePickerContainer}
      />
    </>
  );
};

export default AnalyticsDatePicker;
