import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    zIndex: 6,
    right: '12px',
    bottom: '12px',
    background: '#1A75BA',
    border: '1px solid #0961A3',
    boxSizing: 'border-box',
    borderRadius: '30px',
    padding: '16px',
    '&:focus': {
      outline: 'none',
    },
  },
  text: {
    fontStyle: 'normal',
    fontWeight: 900,
    fontSize: '16px',
    lineHeight: '18px',
    color: 'white',
  },
}));

interface ButtonMobileProps {
  onClick: () => void;
}

const ButtonMobile: React.FC<ButtonMobileProps> = (
  props: ButtonMobileProps
) => {
  const { onClick } = props;
  const styles = useStyles();
  return (
    <button type='button' className={styles.root} onClick={onClick}>
      <span className={styles.text}>
        <FontAwesomeIcon icon={faChartLine} />
        {' Gráfico'}
      </span>
    </button>
  );
};

export default ButtonMobile;
