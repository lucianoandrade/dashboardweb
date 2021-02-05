// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta } from '@storybook/react';
import moment from 'moment';
import React from 'react';
import AnalyticsDatePicker from '../components/AnalyticsDatePicker';

export default {
  title: 'Components/AnalyticsDatePicker',
  component: AnalyticsDatePicker,
} as Meta;

export const Global: React.FC = () => {
  const [values, setValues] = React.useState<DateInterval>({
    start: moment(),
    end: moment(),
  });
  const [selected, setSelected] = React.useState<IntervalTypes>('day');
  return (
    <AnalyticsDatePicker
      values={values}
      onChange={(values) => setValues(values)}
      selected={selected}
      setSelected={setSelected}
      global
    />
  );
};

export const Chart: React.FC = () => {
  const [values, setValues] = React.useState<DateInterval>({
    start: moment(),
    end: moment(),
  });
  const [selected, setSelected] = React.useState<IntervalTypes>('day');
  return (
    <div style={{ marginTop: '200px' }}>
      <AnalyticsDatePicker
        values={values}
        onChange={(values) => setValues(values)}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};
