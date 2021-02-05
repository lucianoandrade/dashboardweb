import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Tabs,
  Tab,
  Container,
  Button,
  Menu,
  MenuItem,
  Backdrop,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { ChatBubble } from '@material-ui/icons';
import { Dispatch, bindActionCreators } from 'redux';

import AvatarSrc from '../AvatarSrc';
import useStyles from './styles';
import { setOperatorView } from '../../store/ducks/operators/actions';
import { setSelectedGroup } from '../../store/ducks/groups/actions';
import {
  createChat,
  setShowChat,
  selectChat,
  selectGroupChat,
} from '../../store/ducks/chat/actions';

interface SubHeaderProps {
  title: string;
  variant?: 'default' | 'operators';
  showAvatar?: boolean;
  avatarImage?: string;
  isOnline?: boolean;
  tabItems?: TabItems[];
  selectedGroup?: Group;
  groups: Group[];
  operatorsIds: number[];
  selectedOperator?: Operator;
  selectedTab: string;
  tabChangeHandler(data: string): void;
  createChat: typeof createChat.success;
  setShowChat: typeof setShowChat;
  selectChat: typeof selectChat;
  selectGroupChat: typeof selectGroupChat;
  setSelectedGroup: typeof setSelectedGroup;
}

export interface TabItems {
  label: string;
  view: string;
}

const SubHeader: React.FC<SubHeaderProps> = (props: SubHeaderProps) => {
  const {
    title,
    tabItems,
    showAvatar,
    avatarImage,
    isOnline,
    selectedTab,
    selectedGroup,
    groups,
    setSelectedGroup,
    selectedOperator,
    variant = 'default',
    tabChangeHandler,
    createChat,
    selectChat,
    selectGroupChat,
    operatorsIds,
    setShowChat,
  } = props;
  const dipatch = useDispatch();
  const styles = useStyles();
  const [groupMenu, setGroupMenu] = useState(false);
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  return (
    <Grid
      container
      className={styles.headerBox}
      direction='row'
      alignItems='center'
    >
      <Container className={styles.headerContainer}>
        <Box className={styles.headerItemsLayout}>
          <Box className={styles.contentRow}>
            {showAvatar ? (
              <Box style={{ marginRight: '20px' }}>
                <AvatarSrc
                  variant='Subheader'
                  img={avatarImage}
                  isOnline={isOnline || false}
                />
              </Box>
            ) : null}
            {selectedGroup && !selectedOperator ? (
              <>
                <Button
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    setAnchorElement(event.currentTarget);
                    setGroupMenu(true);
                  }}
                  style={{
                    marginRight: '12px',
                  }}
                >
                  <Typography variant='h4'>
                    {title}
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      style={{ marginLeft: '12px' }}
                    />
                  </Typography>
                </Button>
                <Backdrop
                  style={{ backgroundColor: 'transparent' }}
                  open={groupMenu}
                  onClick={() => setGroupMenu(false)}
                >
                  <Menu
                    id='simple-menu'
                    anchorEl={anchorElement}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    open={groupMenu}
                    style={{ marginTop: '40px' }}
                  >
                    {groups.map((group) => (
                      <MenuItem
                        key={`Menu - ${group.groupName}`}
                        onClick={() => {
                          setGroupMenu(false);
                          setSelectedGroup(group);
                        }}
                      >
                        {group.groupName}
                      </MenuItem>
                    ))}
                  </Menu>
                </Backdrop>
              </>
            ) : (
              <Typography variant='h4'>{title}</Typography>
            )}
            {selectedGroup && (
              <Box className={styles.sendMessage}>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<ChatBubble />}
                  onClick={() => {
                    if (selectedOperator) {
                      createChat({
                        messages: [],
                        operatorId: selectedOperator.COD_RECUP,
                        operatorName: selectedOperator.operatorName,
                        haveNewMessage: true,
                      });
                      selectChat(selectedOperator.COD_RECUP);
                      setShowChat(true);
                    } else {
                      selectGroupChat({
                        groupName: selectedGroup.groupName,
                        operatorsId: operatorsIds,
                      });
                      setShowChat(true);
                    }
                  }}
                >
                  Enviar Mensagem
                </Button>
              </Box>
            )}

            {selectedGroup && (
              <Box className={styles.breadCrumb}>
                <Link to='/'>Dashboard de Grupos</Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <Link
                  to='/operadores'
                  onClick={(e) => dipatch(setOperatorView('list'))}
                >
                  {selectedGroup.groupName}
                </Link>
                {selectedOperator && (
                  <>
                    <FontAwesomeIcon icon={faChevronRight} />
                    <p>
                      <strong>{selectedOperator.operatorName}</strong>
                    </p>
                  </>
                )}
              </Box>
            )}
          </Box>
          <Paper
            square
            elevation={0}
            className={`${styles.navBar} ${styles[variant]}`}
          >
            <Tabs value={selectedTab} indicatorColor='primary'>
              {tabItems?.map((item) => (
                <Tab
                  key={item.view}
                  label={item.label}
                  value={item.view}
                  classes={{
                    selected: `Mui-selected ${styles.firstTabSelected}`,
                  }}
                  onClick={() => tabChangeHandler(item.view)}
                />
              ))}
            </Tabs>
          </Paper>
        </Box>
      </Container>
    </Grid>
  );
};

const mapStateProps = (state: SRCWEB.ApplicationState) => ({
  selectedOperator: state.operators.selectedOperator.operator,
  operatorsIds: state.operators.operators.map((op) => op.COD_RECUP),
  groups: state.groups.groups,
});
const mapDispatchToProps = (d: Dispatch) =>
  bindActionCreators(
    {
      createChat: createChat.success,
      selectChat,
      setShowChat,
      selectGroupChat,
      setSelectedGroup,
    },
    d
  );

export default connect(mapStateProps, mapDispatchToProps)(SubHeader);
