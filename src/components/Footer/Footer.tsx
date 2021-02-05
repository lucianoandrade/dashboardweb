import React from 'react';
import { Link } from 'react-router-dom';
import { Box, makeStyles, Container } from '@material-ui/core';

import logoTasken from '../../assets/img/LogoTasken.png';

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
    height: '53px',
    backgroundColor: '#DBE5ED',
  },
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& a, & img': {
      height: '20px',
    },
  },
}));

const Footer: React.FC = () => {
  const styles = useStyles();
  return (
    <Box className={styles.footer}>
      <Container className={styles.container}>
        <span>© 2020 Tasken SRC Web. Todos os direitos reservados.</span>
        <Link to='/'>
          <img src={logoTasken} alt='Logo da Tasken' />
        </Link>
      </Container>
    </Box>
  );
};

export default Footer;
