import React from 'react';
import { Box, Button, Hidden, makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { logoutRequest } from '../../../store/ducks/login/actions';

interface UserPanelProps {
  userName?: string;
  groupName?: string | null;
  logoutRequest(): void;
}

const useStyles = makeStyles((theme) => ({
  names: {
    // fontFamily: 'Source Sans Pro',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '18px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'right',

    color: '#A3A3A3',
  },
  logout: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '18px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'right',

    color: 'white',
  },
}));

const UserPanel = (props: UserPanelProps) => {
  const { groupName, userName, logoutRequest } = props;
  const styles = useStyles();
  return (
    <Box
      style={{
        flexGrow: 0,
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Hidden smDown>
        {groupName ? (
          <>
            <span className={styles.names}>{`Grupo: ${groupName}`}</span>
            <span className={styles.names} style={{ marginLeft: '8px' }} />
          </>
        ) : (
          <></>
        )}
        {userName ? (
          <>
            <span className={styles.names}>{`Usuário: ${userName}`}</span>
            <span className={styles.names} style={{ marginLeft: '8px' }}>
              |
            </span>
          </>
        ) : (
          <></>
        )}
        <Button
          color='inherit'
          size='small'
          variant='text'
          onClick={logoutRequest}
          className={styles.logout}
        >
          <span style={{ marginRight: '5px' }}>Sair</span>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </Button>
      </Hidden>
      <Hidden mdUp>
        <Button
          color='inherit'
          size='small'
          variant='text'
          onClick={logoutRequest}
        >
          <span style={{ marginRight: '5px' }}>Sair</span>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </Button>
      </Hidden>
    </Box>
  );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  userName: state.login.user?.name,
  // eslint-disable-next-line camelcase
  groupName: state.login.user?.group_name,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ logoutRequest }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
