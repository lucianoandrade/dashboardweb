import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import LoginForm from '../../components/LoginForm';
import { loadDBInfoRequest } from '../../store/ducks/login/actions';
import useStyles from './styles';

interface LoginProps {
  loadDBInfoRequest(): void;
}

const Login = (props: LoginProps) => {
  const { loadDBInfoRequest } = props;
  const navigate = useNavigate();
  useEffect(() => {
    loadDBInfoRequest();
    navigate('/');
  }, [loadDBInfoRequest, navigate]);

  const styles = useStyles();

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      className={styles.root}
    >
      <Grid item xs={12} sm={8} md={6} xl={5}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ loadDBInfoRequest }, dispatch);

export default connect(null, mapDispatchToProps)(Login);
