import React from 'react';
import { connect } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';

import OperatorItem from './OperatorItem';

interface OperatorContainerProps {
  operators: Operator[];
  loading: boolean;
}

const OperatorContainer = (props: OperatorContainerProps) => {
  const { operators, loading } = props;
  return loading ? (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <CircularProgress />
    </div>
  ) : (
      <>
        {operators.map((operator) => (
          <Box key={`group${operator.COD_RECUP}`}>
            <OperatorItem operator={operator} />
            <Box m='24px' />
          </Box>
        ))}
      </>
    );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  operators: state.operators.operators,
  loading: state.operators.loading,
});

export default connect(mapStateToProps)(OperatorContainer);
