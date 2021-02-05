import React from 'react';
import { connect } from 'react-redux';

import Performance from './Performance';
import Quantitative from './Quantitative';

interface GroupComparisonProps {
  view: GroupViewBy;
}

const GroupComparison: React.FC<GroupComparisonProps> = (
  props: GroupComparisonProps
) => {
  const { view } = props;
  switch (view) {
    case 'Performance':
      return <Performance />;
    default:
      return <Quantitative />;
  }
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  view: state.groups.viewBy,
});

export default connect(mapStateToProps)(GroupComparison);
