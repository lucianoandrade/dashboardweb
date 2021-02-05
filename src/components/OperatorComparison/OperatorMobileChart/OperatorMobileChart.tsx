import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { makeStyles, Typography, Checkbox } from '@material-ui/core';
import { lockBodyScroll, unlockBodyScroll } from '../../../util/lockBodyScroll';
import { colorArray } from '../styles';

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
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
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
    height: '564px',
    overflowX: 'scroll',
    overflowY: 'hidden',
  },
  data: {
    background: 'rgba(219, 229, 237, 0.15)',
    boxShadow:
      'inset 3px 3px 3px rgba(126, 157, 182, 0.15), inset -4px -4px 4px rgba(255, 255, 255, 0.2)',
    borderRadius: '10px 10px 0px 0px',

    display: 'block',
    width: '90vw',
    alignSelf: 'center',
    padding: '32px',
    marginTop: '10px',
    ...Object.fromEntries(
      colorArray.map((color, i) => [`& .checkedColor${i}`, { color }])
    ),
    '& > *': {
      display: 'flex',
      alignItems: 'center',
      '& > .MuiButtonBase-root.MuiCheckbox-root': {
        paddingLeft: '0px',
        '& > .MuiIconButton-label': {
          marginLeft: '-3px',
        },
      },
    },
  },
  searchBarWrapper: {
    position: 'relative',
  },
  searchBar: {
    background: '#FFFFFF',
    border: '1px solid #CED4DA',
    boxSizing: 'border-box',
    borderRadius: '2px',
    height: '40px',
    width: '100%',
    padding: '15px',
    paddingLeft: '35px',
  },
  searchBarIcon: {
    width: '1px',
    position: 'absolute',
    left: '15px',
    color: '#A0AAB5',
  },
}));

interface OperatorMobileChartProps {
  Chart: React.FC;
  operators: Array<{
    name: string;
    checked: boolean;
    checkedIndex?: number;
    disabled: boolean;
    handleClick(): void;
  }>;
  title?: string;
  nameFilter: string;
  setNameFilter(name: string): void;
  onClick: () => void;
  handleIncludeAll: () => void;
  allChecked: boolean;
}

const OperatorMobileChart: React.FC<OperatorMobileChartProps> = (
  props: OperatorMobileChartProps
) => {
  const {
    onClick,
    operators,
    Chart,
    title = 'Desempenho por Operadores',
    nameFilter,
    setNameFilter,
    handleIncludeAll,
    allChecked,
  } = props;
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
        <Typography>{title}</Typography>
      </div>
      <Chart />
      <div className={styles.data}>
        <div className={styles.searchBarWrapper}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchBarIcon} />
          <input
            type='text'
            placeholder='Buscar Operador...'
            value={nameFilter}
            className={styles.searchBar}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
        <Typography>
          <Checkbox
            color='primary'
            checked={allChecked}
            onChange={handleIncludeAll}
          />
          Marcar/Desmarcar todos
        </Typography>
        {operators.map((op, i) => (
          <div key={`Operator-Name-${Math.random() * 1234}`}>
            <Checkbox
              color='primary'
              classes={{
                checked: `checkedColor${op.checkedIndex}`,
              }}
              checked={op.checked}
              onChange={op.handleClick}
              disabled={op.disabled}
            />
            <Typography key={`mobileOperatorItem-${Math.random() * i}`}>
              {op.name}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperatorMobileChart;
