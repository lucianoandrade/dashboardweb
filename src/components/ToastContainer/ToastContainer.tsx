import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ToastContainer as OriginalToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  toast: {
    background: 'white',
    borderRadius: '10px',
    borderBottom: 'red 3px solid',
    color: 'black',
    padding: '16px',
  },
  progress: {
    display: 'none',
  },
}));

const ToastContainer: React.FC = () => {
  const styles = useStyles();
  return (
    <OriginalToastContainer
      toastClassName={styles.toast}
      autoClose={5000}
      hideProgressBar
    />
  );
};

export default ToastContainer;
