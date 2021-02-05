import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import logoTasken from '../../../assets/img/LogoTasken.png';
import { b64toBlob } from '../../../util/b64toBlob';

const useStyle = makeStyles((theme) => ({
  root: {
    // width: '200px',
    padding: '0 24px',
    height: '64px',
    background: 'linear-gradient(111.87deg, #FFFFFF 0%, #EAEAEA 100%);',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25);',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '60px',
      boxShadow: 'none',
    },
    '& a': {
      height: '40px',
    },
    '& img': {
      height: '100%',
    },
  },
}));

interface LogoProps {
  logo?: string;
}

const Logo: React.FC<LogoProps> = (props: LogoProps) => {
  const { logo } = props;
  const styles = useStyle();
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (logo) {
      b64toBlob(logo)
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => {
          if (imgRef.current) {
            imgRef.current.src = url;
          }
        });
    }
  }, [logo]);
  return (
    <Box className={styles.root}>
      <Link to='/'>
        <img ref={imgRef} src={logoTasken} alt='Logo' />
      </Link>
    </Box>
  );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  logo: state.login.user?.imageB64,
});

export default connect(mapStateToProps)(Logo);
