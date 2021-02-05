import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AppBar,
  Container,
  styled,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { setSelectedDate } from '../../store/ducks/license/actions';
import SideMenu from './SideMenu';
import useStyles from './styles';
import UserPanel from './UserPanel';

type Props = {
  selectedDate: string;
  setSelectedDate: typeof setSelectedDate;
};

const BackButton = styled(FontAwesomeIcon)(() => ({
  height: '60px',
  width: '24px',
}));

const LicenseHeaderBar = ({
  selectedDate,
  setSelectedDate,
}: Props): JSX.Element => {
  const styles = useStyles();
  return (
    <AppBar position='static' color='secondary' style={{ height: '60px' }}>
      <Toolbar className={styles.backToolbar}>
        <Container className={styles.container}>
          {selectedDate ? (
            <BackButton
              icon={faChevronLeft}
              onClick={() => setSelectedDate('')}
            />
          ) : (
            <SideMenu />
          )}
          <Typography
            style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '21px',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              color: '#FFFFFF',
              position: selectedDate ? 'relative' : 'initial',
              left: '26px',
            }}
          >
            {selectedDate || 'Controle de Licenças'}
          </Typography>
          <UserPanel />
        </Container>
      </Toolbar>
    </AppBar>
  );
};

const mstp = (state: SRCWEB.ApplicationState) => ({
  selectedDate: state.license.selectedDate,
});
const mdtp = (dispatch: Dispatch) =>
  bindActionCreators({ setSelectedDate }, dispatch);

export default connect(mstp, mdtp)(LicenseHeaderBar);
