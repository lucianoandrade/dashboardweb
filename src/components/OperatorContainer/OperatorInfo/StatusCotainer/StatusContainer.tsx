import React from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';

interface StatusContainerProps {
  online: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      boxShadow: 'inset 0px 3px 4px rgba(0, 0, 0, 0.18)',
      width: '16px',
      height: '16px',
      display: 'inline-block',
      marginRight: '8px',
      borderRadius: '8px',
    },
  })
);

export default (props: StatusContainerProps) => {
  const { online } = props;
  const styles = useStyles();
  return (
    <div
      className={styles.root}
      style={{ color: online ? '#4CBE22' : '#C73228' }}
    >
      <div
        className={styles.icon}
        style={{ backgroundColor: online ? '#4CBE22' : '#C73228' }}
      />
      <Typography
        style={{
          fontSize: '16px',
          lineHeight: '20px',
        }}
        display='inline'
        variant='body1'
      >
        {online ? 'Disponível' : 'Offline'}
      </Typography>
    </div>
  );
};
