import React from 'react';
import { connect } from 'react-redux';
import { Hidden } from '@material-ui/core';

import OperatorItem from '../../OperatorContainer/OperatorItem';

import useStyles from './styles';
import Quantitative from './Quantitative';

interface OperatorHistoryProps {
  operator?: Operator;
}

const OperatorHistory: React.FC<OperatorHistoryProps> = (
  props: OperatorHistoryProps
) => {
  const { operator } = props;
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <Quantitative />
      </div>
      <Hidden smDown>
        <aside className={`${styles.group}`}>
          {operator ? (
            <OperatorItem variant='history' operator={operator} />
          ) : null}
        </aside>
      </Hidden>
    </div>
  );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  operator: state.operators.selectedOperator.operator,
});

export default connect(mapStateToProps)(OperatorHistory);
