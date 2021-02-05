import { styled } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { setSelectedGroup } from '../../../store/ducks/groups/actions';

interface GroupMenuStateProps {
  groups: Group[];
}

interface GroupMenuDispatchProps {
  setSelectedGroup: typeof setSelectedGroup;
}

type GroupMenuProps = GroupMenuStateProps &
  GroupMenuDispatchProps & {
    open: boolean;
    onSelect(): void;
  };

const BackDrop = styled('div')({
  position: 'fixed',
  top: '0px',
  left: '0px',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#0004',
  zIndex: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Menu = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
const MenuItem = styled('button')({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '150%',
  color: '#1F191A',
  padding: '16px 64px',
});

const GroupMenu = ({
  groups,
  open,
  onSelect,
  setSelectedGroup,
}: GroupMenuProps) => {
  const handleClick = (group: Group) => {
    setSelectedGroup(group);
    onSelect();
  };
  return open ? (
    <BackDrop onClick={onSelect}>
      <Menu>
        {groups.map((group) => (
          <MenuItem onClick={() => handleClick(group)} key={group.COD_GROUP}>
            {group.groupName}
          </MenuItem>
        ))}
      </Menu>
    </BackDrop>
  ) : (
    <></>
  );
};

const mapStateToProps = (
  state: SRCWEB.ApplicationState
): GroupMenuStateProps => ({ groups: state.groups.groups });

const mapDispatchToProps = (dispatch: Dispatch): GroupMenuDispatchProps =>
  bindActionCreators({ setSelectedGroup }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GroupMenu);
