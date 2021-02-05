import {
  AppBar,
  Container,
  Hidden,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import BackHeader from './BackHeader';
import LicenseHeaderBar from './LicenseHeaderBar';
import Logo from './Logo';
import SideMenu from './SideMenu';
import useStyles from './styles';
import UserPanel from './UserPanel';

interface headerProps {
  operator?: SelectedOperator;
  group?: Group;
}

const Header = (props: headerProps) => {
  const { operator, group } = props;
  const styles = useStyles();
  const location = useLocation();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  if (mobile && location.pathname === '/licenca') return <LicenseHeaderBar />;
  return (
    <AppBar position='fixed' color='secondary' style={{ height: '60px' }}>
      {operator || group ? (
        <Toolbar className={styles.backToolbar}>
          <Container className={styles.container}>
            <Hidden xsDown>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SideMenu />
                <Logo />
              </div>
              <UserPanel />
            </Hidden>
            <Hidden smUp>
              <BackHeader />
            </Hidden>
          </Container>
        </Toolbar>
      ) : (
          <Container className={styles.container}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SideMenu />
              <Logo />
            </div>
            <UserPanel />
          </Container>
        )}
    </AppBar>
  );
};

const mapStateProps = (state: SRCWEB.ApplicationState) => ({
  operator: state.operators.selectedOperator?.operator,
  group: state.groups.selectedGroup,
});

export default connect(mapStateProps, null)(Header);
