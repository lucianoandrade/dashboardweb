import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faColumns,
  faUsers,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  selectFirstGroup,
  setGroupView,
  setSelectedGroup,
} from '../../../store/ducks/groups/actions';
import {
  selectOperator,
  setOperatorView,
} from '../../../store/ducks/operators/actions';
import {
  Divider,
  DrawerButton,
  MenuItem,
  MenuItemIcon,
  MenuItemText,
  Section,
  SectionTitle,
  SideMenuDrawer,
} from './styled';

interface SideMenuStateProps {
  isSupervisor?: boolean;
  licensePermission?: boolean;
  selectedGroup?: Group;
}
interface SideMenuDispatchProps {
  setGroupView: typeof setGroupView;
  setOperatorView: typeof setOperatorView;
  selectFirstGroup: typeof selectFirstGroup;
  setSelectedGroup: typeof setSelectedGroup;
  selectOperator: typeof selectOperator;
}

type SideMenuProps = SideMenuStateProps & SideMenuDispatchProps;

const SideMenu = (props: SideMenuProps) => {
  const {
    setGroupView,
    setOperatorView,
    selectFirstGroup,
    selectedGroup,
    setSelectedGroup,
    selectOperator,
    isSupervisor,
    licensePermission,
  } = props;
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  const handleGroupClick = (view: GroupView) => {
    handleToggle();
    setSelectedGroup(undefined);
    selectOperator(undefined);
    setGroupView(view);
  };
  const handleOperatorClick = (view: OperatorViewType) => {
    handleToggle();
    if (!selectedGroup) selectFirstGroup();
    selectOperator(undefined);
    setOperatorView(view);
  };
  const handleLicenseClick = () => {
    handleToggle();
    setSelectedGroup(undefined);
    selectOperator(undefined);
  };
  const [accordions, setAccordions] = useState({
    group: false,
    operator: false,
  });
  const handleExpand = (section: keyof typeof accordions) => {
    setAccordions((state) => ({
      ...state,
      [section]: !state[section],
    }));
  };
  const location = useLocation();
  return (
    <>
      <DrawerButton type='button' variant='text' onClick={handleToggle}>
        <FontAwesomeIcon icon={faBars} />
        <div className='buttonText'>Menu</div>
      </DrawerButton>
      <SideMenuDrawer anchor='left' open={open} onClose={handleToggle}>
        {isSupervisor ? (
          <>
            <SectionTitle>Dashboard de Grupos</SectionTitle>
            <Section elevation={0} expanded={accordions.group}>
              <MenuItem onClick={() => handleExpand('group')}>
                <MenuItemIcon>
                  <FontAwesomeIcon icon={faColumns} />
                </MenuItemIcon>
                <MenuItemText>Grupos</MenuItemText>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  style={{
                    transform: accordions.group ? 'rotate(180deg)' : '',
                    alignSelf: 'center',
                    justifySelf: 'center',
                  }}
                />
              </MenuItem>
              <MenuItem subItem active={location.pathname === '/grupos'}>
                <MenuItemText>
                  <Link to='/grupos' onClick={() => handleGroupClick('list')}>
                    Lista de grupos
                  </Link>
                </MenuItemText>
              </MenuItem>
              <MenuItem
                subItem
                active={location.pathname === '/grupos/comparativos'}
              >
                <MenuItemText>
                  <Link
                    to='/grupos/comparativos'
                    onClick={() => handleGroupClick('comparison')}
                  >
                    Comparativo
                  </Link>
                </MenuItemText>
              </MenuItem>
            </Section>
            <Section elevation={0} expanded={accordions.operator}>
              <MenuItem onClick={() => handleExpand('operator')}>
                <MenuItemIcon>
                  <FontAwesomeIcon icon={faUsers} />
                </MenuItemIcon>
                <MenuItemText>Operadores</MenuItemText>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  style={{
                    transform: accordions.operator ? 'rotate(180deg)' : '',
                    alignSelf: 'center',
                    justifySelf: 'center',
                  }}
                />
              </MenuItem>
              <MenuItem subItem active={location.pathname === '/operadores'}>
                <MenuItemText>
                  <Link
                    to='/operadores'
                    onClick={() => handleOperatorClick('list')}
                  >
                    Lista de operadores
                  </Link>
                </MenuItemText>
              </MenuItem>
              <MenuItem
                subItem
                active={location.pathname === '/operadores/comparativo'}
              >
                <MenuItemText>
                  <Link
                    to='/operadores/comparativo'
                    onClick={() => handleOperatorClick('comparison')}
                  >
                    Comparativo
                  </Link>
                </MenuItemText>
              </MenuItem>
            </Section>
          </>
        ) : (
            <>
              <SectionTitle>Dashboard de Grupos</SectionTitle>
              <MenuItem
                subItem
                active={location.pathname === '/perfil/historico'}
              >
                <MenuItemText>
                  <Link
                    to='/perfil/historico'
                    onClick={() => {
                      handleToggle();
                      setOperatorView('history');
                    }}
                  >
                    Histórico
                </Link>
                </MenuItemText>
              </MenuItem>
              <MenuItem subItem active={location.pathname === '/perfil/detalhe'}>
                <MenuItemText>
                  <Link
                    to='/perfil/detalhe'
                    onClick={() => {
                      handleToggle();
                      setOperatorView('details');
                    }}
                  >
                    Detalhe
                </Link>
                </MenuItemText>
              </MenuItem>
            </>
          )}
        {licensePermission && (
          <>
            <Divider />
            <SectionTitle>Licenças</SectionTitle>
            <Section elevation={0} expanded>
              <MenuItem subItem active={location.pathname === '/licenca'}>
                <MenuItemIcon>
                  <FontAwesomeIcon icon={faFileAlt} />
                </MenuItemIcon>
                <MenuItemText>
                  <Link
                    to='/licenca'
                    onClick={() => {
                      handleLicenseClick();
                    }}
                  >
                    Controle de Licenças
                  </Link>
                </MenuItemText>
              </MenuItem>
            </Section>
          </>
        )}

        <div style={{ marginTop: 10 }}>
          <Divider />
          <SectionTitle>Analítico</SectionTitle>
          <Section elevation={0} expanded>
            <MenuItem subItem active={location.pathname === '/analitico'}>
              <MenuItemIcon>
                <FontAwesomeIcon icon={faFileAlt} />
              </MenuItemIcon>
              <MenuItemText>
                <Link
                  to='/analitico'
                  onClick={() => {
                    handleLicenseClick();
                  }}
                >
                  Controle do analítico
                </Link>
              </MenuItemText>
            </MenuItem>
          </Section>
        </div>

        {/* <div style={{ marginTop: 10 }}>
          <Divider />
          <SectionTitle>Páginas mais acessadas</SectionTitle>
          <Section elevation={0} expanded>
            <MenuItem subItem active={location.pathname === '/maisacessadas'}>
              <MenuItemIcon>
                <FontAwesomeIcon icon={faFileAlt} />
              </MenuItemIcon>
              <MenuItemText>
                <Link
                  to='/maisacessadas'
                  onClick={() => {
                    handleLicenseClick();
                  }}
                >
                  Páginas mais acessadas
                </Link>
              </MenuItemText>
            </MenuItem>
          </Section>
        </div> */}
      </SideMenuDrawer>
    </>
  );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => {
  const nivelGroup = state.login.user?.nivelGroup;
  let licensePermission = false;
  if (typeof nivelGroup === 'number') licensePermission = nivelGroup < 3;
  return {
    isSupervisor: state.login.isSupervisor,
    selectedGroup: state.groups.selectedGroup,
    licensePermission,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setGroupView,
      setOperatorView,
      selectFirstGroup,
      setSelectedGroup,
      selectOperator,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
