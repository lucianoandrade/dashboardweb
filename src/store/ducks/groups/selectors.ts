import moment from 'moment';

/**
 * Recupera apenas os dados de usuário para uso no redux/saga
 * @param state Estado da aplicação
 */
export const getUserData = (
  state: SRCWEB.ApplicationState
): GQL.IRequestListGroupDto => ({
  param: state.filter.param,
  initDate: moment(state.filter.dateFilter.start).format('YYYY-MM-DD'),
  endDate: moment(state.filter.dateFilter.end).format('YYYY-MM-DD'),
  COD_GROUP: state.login.user?.COD_GROUP || 0,
  COD_RECUP: state.login.user?.COD_RECUP || 0,
});

export const getComparisonData = (
  state: SRCWEB.ApplicationState
): GQL.IRequestComparativeGroup => ({
  param: state.filter.param,
  initDate: moment(state.filter.dateFilter.start).format('YYYY-MM-DD'),
  endDate: moment(state.filter.dateFilter.end).format('YYYY-MM-DD'),
  COD_RECUP: state.login.user?.COD_RECUP || 0,
  comparativeType: state.groups.viewBy,
});

export const isGroupSelected = (state: SRCWEB.ApplicationState) =>
  state.groups.selectedGroup;
