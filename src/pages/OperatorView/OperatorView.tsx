import React, { ChangeEvent, useEffect } from 'react';
import { Grid, makeStyles, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Routes, Route, useNavigate } from 'react-router';
import {
  selectableIntervals,
  selectableParams,
  selectableTabsOperator,
  TabsWithOptions,
  TabOptions,
} from './constants';
import SubHeader from '../../components/SubHeader';
import FilterBar from '../../components/FilterBar';
import {
  loadOwnOperatorData,
  setOperatorView,
  setOperatorViewBy,
  cleanSelectedOperator,
} from '../../store/ducks/operators/actions';
import {
  setChoosenInterval,
  setChoosenParam,
  setCustomInterval,
} from '../../store/ducks/filter/actions';
import OperatorDetails from '../../components/OperatorContainer/OperatorDetails';
import OperatorHistory from '../../components/OperatorContainer/OperatorHistory';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  empity: {},
  fullScreenContent: {
    minHeight: 'calc(100vh - 53px - 64px - 210px)',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
    },
  },
}));

interface OperatorDashboardProps {
  param: string;
  view: OperatorViewType;
  viewBy: OperatorViewBy;
  choosenInterval: IntervalTypes;
  dateFilter: DateInterval;
  selectedOperator: SelectedOperator;
  loadOperator(): void;
  setChoosenInterval(data: IntervalTypes): void;
  setChoosenParam(data: ParamTypes): void;
  setOperatorView(data: OperatorViewType): void;
  setOperatorViewBy(data: OperatorViewBy): void;
  setCustomInterval(data: DateInterval): void;
  cleanSelectedOperator(): void;
}

const OperatorDashboard = (props: OperatorDashboardProps) => {
  const {
    dateFilter,
    choosenInterval,
    param,
    view,
    viewBy,
    selectedOperator,
    setChoosenParam,
    setOperatorView,
    setOperatorViewBy,
    setCustomInterval,
    loadOperator,
    setChoosenInterval,
    cleanSelectedOperator,
  } = props;
  const selectOperatorView: boolean = ['details', 'history'].includes(view);
  const styles = useStyles();
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChoosenInterval(e.target.value as IntervalTypes);
  };
  useEffect(() => {
    if (view !== 'history' && view !== 'details') {
      setOperatorView('history');
    } else {
      loadOperator();
    }
  }, [
    choosenInterval,
    dateFilter,
    param,
    view,
    viewBy,
    loadOperator,
    setOperatorView,
  ]);

  const handleParamChange = (param: string) => {
    setChoosenParam(param as ParamTypes);
  };

  const navigate = useNavigate();
  const handleViewChange = (data: OperatorViewType) => {
    if (!selectOperatorView) {
      cleanSelectedOperator();
    }
    setOperatorView(data);
    navigate(data === 'history' ? '/perfil/historico' : '/perfil/detalhe');
  };
  const handleCustomInterval = (data: DateInterval) => {
    setCustomInterval(data);
  };
  const handleViewByChange = (data: OperatorViewBy) => {
    setOperatorViewBy(data);
  };
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      className={styles.root}
    >
      {' '}
      <SubHeader
        title={selectedOperator.operator?.operatorName || 'Operadores'}
        tabItems={selectableTabsOperator}
        variant='operators'
        showAvatar={selectOperatorView}
        isOnline={selectedOperator.operator?.isOnline || false}
        avatarImage={selectedOperator.operator?.urlAvatar}
        selectedTab={
          selectableTabsOperator.find((tab) => tab.view === view)
            ? view
            : 'history'
        }
        tabChangeHandler={handleViewChange}
      />
      {view !== 'details' ? (
        <FilterBar
          currentTab={view}
          tabsWithOptions={TabsWithOptions}
          tabOptions={TabOptions}
          currentTabOption={viewBy}
          selectableParams={selectableParams}
          selectableDateIntervals={selectableIntervals}
          currentParam={param}
          currentDateInterval={choosenInterval}
          customDateInterval={dateFilter}
          dateIntervalHandler={handleDateChange}
          changeParamHandler={handleParamChange}
          customDateIntervalHandler={handleCustomInterval}
          changeViewOptions={handleViewByChange}
        />
      ) : null}
      <Container className={view === 'details' ? styles.fullScreenContent : ''}>
        <Routes>
          <Route path='detalhe' element={<OperatorDetails />} />
          <Route path='historico' element={<OperatorHistory />} />
        </Routes>
      </Container>
    </Grid>
  );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  selectedOperator: state.operators.selectedOperator,
  param: state.filter.param,
  choosenInterval: state.filter.choosenInterval,
  dateFilter: state.filter.dateFilter,
  view: state.operators.view,
  viewBy: state.operators.viewBy,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      loadOperator: loadOwnOperatorData.request,
      setChoosenInterval,
      setChoosenParam,
      setOperatorView,
      setOperatorViewBy,
      setCustomInterval,
      cleanSelectedOperator,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OperatorDashboard);
