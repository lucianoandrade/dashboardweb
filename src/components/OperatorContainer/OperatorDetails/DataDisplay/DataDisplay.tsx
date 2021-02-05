import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  large: {
    marginBottom: '32px',
    width: '420px',
    [theme.breakpoints.down('sm')]: {
      width: '320px',
    },
  },
  medium: {
    marginBottom: '32px',
    width: '210px',
    [theme.breakpoints.down('sm')]: {
      width: '150px',
    },
  },
  small: {
    marginBottom: '32px',
    width: '100px',
    [theme.breakpoints.down('sm')]: {
      width: '150px',
    },
  },
}));

interface DataDysplayProps {
  title: string;
  value: string | number;
  size?: 'small' | 'medium' | 'large';
}

export default (props: DataDysplayProps) => {
  const styles = useStyles();
  const { title, value, size = 'medium' } = props;
  return (
    <>
      <Box className={styles[size]}>
        <p
          style={{
            fontSize: '15px',
            lineHeight: '18px',
            color: '#57585B',
          }}
        >
          {title}:
        </p>
        <p
          style={{
            fontSize: '17px',
            lineHeight: '20px',
            fontWeight: 500,
            color: '#1F191A',
          }}
        >
          {value}
        </p>
      </Box>
    </>
  );
};
