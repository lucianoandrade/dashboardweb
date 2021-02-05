import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { setSelectedGroup } from '../../../store/ducks/groups/actions';
import { setOperatorView } from '../../../store/ducks/operators/actions';
import AvatarSrc from '../../AvatarSrc';
import GroupMenu from '../GroupMenu';
import SideMenu from '../SideMenu';

interface backHeaderProps {
  operator?: Operator;
  group?: Group;
  setOperatorView(data: OperatorViewType): void;
  setSelectedGroup(data: undefined): void;
}

const BackHeader = (props: backHeaderProps) => {
  const { operator, group } = props;

  const [menuOpen, setMenuOpen] = useState(false);
  const handleGroupMenuOpen = () => {
    setMenuOpen(true);
  };
  return (
    <Box style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <SideMenu />
      {operator ? (
        <>
          <Box style={{ marginRight: '20px' }}>
            <AvatarSrc
              variant='header'
              isOnline={operator?.isOnline || false}
              img={operator?.urlAvatar}
            />
          </Box>
          <Typography style={{ fontSize: '18px', lineHeight: '20px' }}>
            <strong>{operator?.operatorName}</strong>
          </Typography>
        </>
      ) : (
        <>
          <Typography
            style={{
              fontSize: '18px',
              lineHeight: '20px',
              flex: '1',
              textAlign: 'center',
            }}
            onClick={handleGroupMenuOpen}
          >
            <strong>{group?.groupName}</strong>
          </Typography>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ width: '42px', height: '42px', padding: '11px 0px' }}
            onClick={handleGroupMenuOpen}
          />
          <GroupMenu open={menuOpen} onSelect={() => setMenuOpen(false)} />
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  operator: state.operators.selectedOperator.operator,
  group: state.groups.selectedGroup,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setOperatorView,
      setSelectedGroup,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BackHeader);
