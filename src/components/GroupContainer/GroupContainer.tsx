import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Box } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import GroupItem from './GroupItem';
import { setIsSupervisor } from '../../store/ducks/login/actions';

interface GroupContainerProps {
  groups: Array<Group>;
  loading: boolean;
  setIsSupervisor: typeof setIsSupervisor;
}

const GroupContainer = (props: GroupContainerProps) => {
  const { groups, loading, setIsSupervisor } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && groups.length === 0) {
      setIsSupervisor(false);
      navigate('/perfil/historico');
    } else {
      setIsSupervisor(true);
    }
  }, [groups, loading, navigate, setIsSupervisor]);
  return groups.length > 0 ? (
    <>
      {groups.map((group) => (
        <Box key={`group${group.groupName}`}>
          <GroupItem
            COD_GROUP={group.COD_GROUP}
            groupName={group.groupName}
            groupData={group.groupData}
          />
          <Box m='24px' />
        </Box>
      ))}
    </>
  ) : (
    <></>
  );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  groups: state.groups.groups,
  loading: state.groups.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setIsSupervisor }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GroupContainer);
