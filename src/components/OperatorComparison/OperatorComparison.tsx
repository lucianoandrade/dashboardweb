import React from 'react';
import { connect } from 'react-redux';
import { Hidden } from '@material-ui/core';

import Performance from './Performance';
import GroupItem from '../GroupContainer/GroupItem';

import useStyles from './styles';
import Quantitative from './Quantitative';

interface OperatorComparisonProps {
  operators: OperatorsState;
  group?: Group;
  viewBy: OperatorViewBy;
}

const OperatorComparison: React.FC<OperatorComparisonProps> = (
  props: OperatorComparisonProps
) => {
  const { operators, group, viewBy } = props;
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        {viewBy === 'Performance' ? (
          <Performance operators={operators} />
        ) : (
          <Quantitative />
        )}
      </div>
      <Hidden smDown>
        <aside className={`${styles.group}`}>
          {group ? (
            <GroupItem
              groupName={group.groupName}
              groupData={group.groupData}
              COD_GROUP={group.COD_GROUP}
              vertical
            />
          ) : null}
        </aside>
      </Hidden>
    </div>
  );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  operators: state.operators,
  group: state.groups.selectedGroup,
  viewBy: state.operators.viewBy,
});

export default connect(mapStateToProps)(OperatorComparison);
