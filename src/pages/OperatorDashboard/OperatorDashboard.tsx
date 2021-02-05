import React, { ChangeEvent, useEffect } from 'react';
import { Grid, makeStyles, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import {
  selectableIntervals,
  selectableParams,
  selectableTabs,
  selectableTabsOperator,
  TabsWithOptions,
  TabOptions,
} from './constants';
import SubHeader from '../../components/SubHeader';
import OperatorContainer from '../../components/OperatorContainer';
import FilterBar from '../../components/FilterBar';
import {
  loadOperator,
  setOperatorView,
  setOperatorViewBy,
  cleanSelectedOperator,
} from '../../store/ducks/operators/actions';
import { loadGroup } from '../../store/ducks/groups/actions';
import {
  setChoosenInterval,
  setChoosenParam,
  setCustomInterval,
} from '../../store/ducks/filter/actions';
import OperatorComparison from '../../components/OperatorComparison';
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
  group?: Group;
  param: string;
  view: OperatorViewType;
  viewBy: OperatorViewBy;
  choosenInterval: IntervalTypes;
  dateFilter: DateInterval;
  selectedOperator: SelectedOperator;
  loadOperator(): void;
  loadGroup(): void;
  setChoosenInterval(data: IntervalTypes): void;
  setChoosenParam(data: ParamTypes): void;
  setOperatorView(data: OperatorViewType): void;
  setOperatorViewBy(data: OperatorViewBy): void;
  setCustomInterval(data: DateInterval): void;
  cleanSelectedOperator(): void;
}

const OperatorDashboard = (props: OperatorDashboardProps) => {
  const {
    group,
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
    loadGroup,
    setChoosenInterval,
    cleanSelectedOperator,
  } = props;
  const selectOperatorView: boolean = ['details', 'history'].includes(view);
  const styles = useStyles();
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChoosenInterval(e.target.value as IntervalTypes);
  };
  const COD_GROUP = group?.COD_GROUP;
  useEffect(() => {
    loadGroup();
    loadOperator();
  }, [
    choosenInterval,
    dateFilter,
    param,
    viewBy,
    loadOperator,
    COD_GROUP,
    loadGroup,
  ]);

  const handleParamChange = (param: string) => {
    setChoosenParam(param as ParamTypes);
  };

  const navigate = useNavigate();
  const handleViewChange = (data: OperatorViewType) => {
    if (!selectOperatorView) {
      cleanSelectedOperator();
    }
    const routesMap: Record<OperatorViewType, string> = {
      comparison: '/operadores/comparativo',
      details: '/operadores/detalhe',
      history: '/operadores/historico',
      list: '/operadores',
    };
    setOperatorView(data);
    navigate(routesMap[data]);
  };
  const handleCustomInterval = (data: DateInterval) => {
    setCustomInterval(data);
  };
  const handleViewByChange = (data: OperatorViewBy) => {
    setOperatorViewBy(data);
  };
  return group ? (
    <Grid
      container
      justify='center'
      alignItems='center'
      className={styles.root}
    >
      {' '}
      <SubHeader
        title={
          selectedOperator?.operator?.operatorName ||
          group?.groupName ||
          'Operadores'
        }
        selectedGroup={group}
        tabItems={selectOperatorView ? selectableTabsOperator : selectableTabs}
        variant='operators'
        showAvatar={selectOperatorView}
        isOnline={selectedOperator.operator?.isOnline || false}
        avatarImage={selectedOperator.operator?.urlAvatar}
        selectedTab={view}
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
          <Route path='/' element={<OperatorContainer />} />
          <Route path='comparativo' element={<OperatorComparison />} />
          <Route path='detalhe' element={<OperatorDetails />} />
          <Route path='historico' element={<OperatorHistory />} />
        </Routes>
      </Container>
    </Grid>
  ) : (
      <Navigate to='/' />
    );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  group: state.groups.selectedGroup,
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
      loadOperator,
      loadGroup,
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
