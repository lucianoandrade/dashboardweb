import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core';

import { ChartPagesData } from '../constants';

interface ChartPaginationControlProps {
  chartPage: number;
  chartPages: Array<ChartPagesData>;
  handleChartPageChange(direction: 'prev' | 'next'): void;
  mobile?: boolean;
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  commomHeader: {
    height: '57px',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    '&::after': {
      content: '""',
      height: '11px',
      position: 'absolute',
      left: '0px',
      right: '0px',
      bottom: '0px',
      background:
        'linear-gradient(180deg, rgba(219, 229, 237, 0) 0%, rgba(219, 229, 237, 0.4) 100%)',
    },
  },
  content: {
    display: 'flex',
    overflow: 'auto',
    '& > button': {
      display: 'block',
      alignSelf: 'center',
      width: '47px',
      height: '47px',
      backgroundColor: '#DBE5ED',
      borderRadius: '50%',
      flexShrink: 0,
      margin: '12px',
    },
  },
  mobileButton: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > button': {
      backgroundColor: '#DBE5ED',
      borderRadius: '6px',
      margin: '20px',
      padding: '14px 20px',
      '& > [data-icon="chevron-left"]': {
        marginRight: '20px',
      },
      '& > [data-icon="chevron-right"]': {
        marginLeft: '20px',
      },
    },
  },
}));

const ChartPaginationControl: React.FC<ChartPaginationControlProps> = (
  props: ChartPaginationControlProps
) => {
  const {
    chartPage,
    chartPages,
    handleChartPageChange,
    mobile,
    children,
  } = props;

  const styles = useStyles();

  return (
    <>
      <div className={styles.commomHeader}>
        <div>{chartPages[chartPage].displayText}</div>
      </div>
      <div className={styles.content}>
        {!mobile && (
          <button
            type='button'
            disabled={chartPage === 0}
            onClick={() => handleChartPageChange('prev')}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        {children}
        {!mobile && (
          <button
            type='button'
            disabled={chartPage === chartPages.length - 1}
            onClick={() => handleChartPageChange('next')}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>
      {mobile && (
        <div className={styles.mobileButton}>
          <button
            type='button'
            disabled={chartPage === 0}
            onClick={() => handleChartPageChange('prev')}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            Anterior
          </button>

          <button
            type='button'
            disabled={chartPage === chartPages.length - 1}
            onClick={() => handleChartPageChange('next')}
          >
            Próximo
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </>
  );
};

export default ChartPaginationControl;
