import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import formater from '../charts/ChartTextFormater';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    height: '26px',
    backgroundColor: '#DBE5ED',
    borderRadius: '3px',
  },
  inner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A75BA',
    width: '80%',
    height: '100%',
    borderRadius: '3px',
  },
  border: {
    padding: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(31, 25, 26, 0.1)',
    borderRadius: '3px',
  },
  text: {
    color: '#FFFFFF',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
});
interface TimeBarProps {
  maxValue: number;
  value: number;
  title: string;
  type?: 'HH:mm' | 'HH:mm:ss' | 'mm:ss';
  showMax?: boolean;
}
const TimeBar: React.FC<TimeBarProps> = (props: TimeBarProps) => {
  const { title, value, maxValue, showMax, type = 'HH:mm:ss' } = props;
  const getWidth = () => {
    return (value * 100) / maxValue;
  };
  const styles = useStyles();
  return (
    <div>
      <div className={styles.row}>
        <Typography display='inline'>{title}</Typography>
        <Typography display='inline'>
          <strong>{formater(value, type)}</strong>
          {showMax ? ` | ${formater(maxValue, type)}` : ''}
        </Typography>
      </div>
      <div className={styles.border}>
        <div className={styles.root}>
          <div className={styles.inner} style={{ width: `${getWidth()}%` }}>
            <Typography className={styles.text}>
              {formater(value, type)}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeBar;
