import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { lockBodyScroll, unlockBodyScroll } from '../../../util/lockBodyScroll';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    height: '98vh',
    width: '100vw',
    bottom: '0px',
    left: '0px',
    backgroundColor: 'white',
    borderRadius: '8px 8px 0px 0px',
    zIndex: 1110,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '52px',
    width: '100%',
    padding: '19px 20px',
    borderBottom: '1px solid #C5D1DB',
  },
  closeButtom: {
    fontFamily: 'Source Sans Pro',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    display: 'flex',
    alignItems: 'center',
    color: '#13B1D1',

    backgroundColor: '#FFF0',
    position: 'absolute',
    left: '20px',
    padding: '12px 0px',
  },
  content: {
    height: 'inherit',
    overflowX: 'hidden',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px 20px 0px',
  },
  chartWrapper: {
    marginTop: '20px',
    width: '90vw',
    overflowX: 'scroll',
    overflowY: 'hidden',
  },
  data: {
    background: 'rgba(219, 229, 237, 0.15)',
    boxShadow:
      'inset 3px 3px 3px rgba(126, 157, 182, 0.15), inset -4px -4px 4px rgba(255, 255, 255, 0.2)',
    borderRadius: '10px 10px 0px 0px',

    display: 'block',
    bottom: '0px',
    left: '5vw',
    width: '90vw',
    padding: '32px',

    '& > *': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px',
    },
    '& > *::before': {
      content: '""',
      display: 'inline-block',
      height: '20px',
      width: '40px',
      background: '#A0AAB5',
      borderRadius: '2px',
      marginRight: '12px',
    },
    '& > :nth-child(1)::before': {
      background: '#7DE315',
    },
    '& > :nth-child(2)::before': {
      background: '#14A0C1',
    },
    '& > :nth-child(3)::before': {
      background: '#F1C422',
    },
    '& > :nth-child(4)::before': {
      background: '#5159AC',
    },
  },
}));

interface ComparisonChartMobileProps {
  Chart: React.FC;
  groups: Array<string>;
  title?: string;
  onClick: () => void;
}

const ComparisonChartMobile: React.FC<ComparisonChartMobileProps> = (
  props: ComparisonChartMobileProps
) => {
  const { onClick, groups, Chart, title = 'Desempenho por grupo' } = props;
  lockBodyScroll();
  const handleModalClose = () => {
    unlockBodyScroll();
    onClick();
  };
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <button
          type='button'
          onClick={handleModalClose}
          className={styles.closeButtom}
        >
          Fechar
        </button>
        <Typography>Comparativo por grupos</Typography>
      </div>
      <div className={styles.content}>
        <div className={styles.chartContainer}>
          <Typography variant='h4'>{title}</Typography>
          <div className={styles.chartWrapper}>
            <Chart />
          </div>
        </div>
        <div className={styles.data}>
          {groups.map((group, i) => (
            <Typography key={`mobileGroupItem-${Math.random() * i}`}>
              {group}
            </Typography>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonChartMobile;
