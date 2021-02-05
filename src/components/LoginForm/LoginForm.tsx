import React, { useState, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Button, Grid, Paper } from '@material-ui/core';

import Select from '../Select';
import Input from '../Input';
import { loginRequest } from '../../store/ducks/login/actions';
import { SelectOption } from '../Select/Select';
import { LoginDTO } from '../../services/dto/Login';
import useStyles from './styles';

import logoImage from '../../assets/img/logo.svg';

export interface LoginFormProps {
  dbLoading: boolean;
  dbOptions: DbInfo[];
  loginRequest(data: LoginDTO): void;
}

const LoginForm = (props: LoginFormProps) => {
  const { dbOptions: dbOptionsProp, loginRequest, dbLoading } = props;
  const styles = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dbId, setDbId] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    dbId: '',
  });

  const dbOptions: SelectOption[] = dbOptionsProp.map((opt) => ({
    display: opt.dbName,
    value: opt.number,
  }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    let isFormComplete = true;

    const errors = {
      username: '',
      password: '',
      dbId: '',
    };
    if (!dbId) {
      errors.dbId = 'Escolha um banco para se conectar';
      isFormComplete = false;
    }
    if (!password) {
      errors.password = 'Digite sua senha';
      isFormComplete = false;
    }
    if (!username) {
      errors.username = 'Digite seu nome de usuário';
      isFormComplete = false;
    }

    setErrors(errors);

    if (isFormComplete) {
      loginRequest({
        username,
        password,
        dbId,
      });
    }
  };

  return (
    <Grid container className={styles.root}>
      <Grid
        item
        xs={false}
        sm={false}
        md={4}
        xl={5}
        className={styles.logoContainer}
      >
        <div className={styles.shadow} />
        <div className={styles.logoFilter}>
          <img src={logoImage} alt='Tasken logo' />
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        xl={7}
        component={Paper}
        square
        className={styles.paper}
        elevation={0}
      >
        <form className={styles.form} action='' onSubmit={onSubmit}>
          <div className={styles.logo}>
            <img src={logoImage} alt='Tasken' />
          </div>
          <Select
            displayText='Banco de Dados'
            placeholder='Selecione o banco de dados'
            options={dbOptions}
            loading={dbLoading}
            value={dbId}
            set={setDbId}
            error={!!errors.dbId}
            helperText={errors.dbId}
          />
          <Input
            displayText='Usuário'
            placeholder='Ex: usuariotasken'
            type='text'
            onChange={setUsername}
            error={!!errors.username}
            helperText={errors.username}
          />
          <Input
            displayText='Senha'
            placeholder='Sua senha'
            type='password'
            onChange={setPassword}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            classes={{ root: styles.button }}
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
          >
            Entrar
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  dbLoading: state.login.loading,
  dbOptions: state.login.db,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ loginRequest }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
