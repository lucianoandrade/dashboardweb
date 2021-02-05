import moment from 'moment';

/**
 * Recupera apenas os dados de usuário para uso no redux/saga
 * @param state Estado da aplicação
 */
export const getOperatorsList = (
  state: SRCWEB.ApplicationState
): GQL.IRequestListOperatorByGroup => ({
  param: state.filter.param,
  initDate: moment(state.filter.dateFilter.start).format('YYYY-MM-DD'),
  endDate: moment(state.filter.dateFilter.end).format('YYYY-MM-DD'),
  COD_GROUP:
    state.groups.selectedGroup?.COD_GROUP || state.login.user?.COD_GROUP || 0,
  // eslint-disable-next-line camelcase
  token_license: state.login.user?.token_license || '',
  licenseApiUrl: state.login.user?.licenseApiUrl || '',
});

export const getOperatorDetail = (
  state: SRCWEB.ApplicationState
): GQL.IRequestUserDetail => ({
  id: state.operators.selectedOperator?.operator?.COD_RECUP || 0,
});

export const operatorHistorySelect = (
  state: SRCWEB.ApplicationState
): GQL.IRequestUserHistory => ({
  param: state.filter.param,
  COD_RECUP:
    state.operators.selectedOperator?.operator?.COD_RECUP ||
    state.login.user?.COD_RECUP ||
    0,
  initDate: moment(state.filter.dateFilter.start).format('YYYY-MM-DD'),
  endDate: moment(state.filter.dateFilter.end).format('YYYY-MM-DD'),
  historyType: state.operators.viewBy,
});

export const OperatorData = (
  state: SRCWEB.ApplicationState
): GQL.IRequestComparativeOperatorByGroup => ({
  COD_GROUP: state.groups.selectedGroup?.COD_GROUP || 0,
  comparativeType: state.operators.viewBy,
  initDate: moment(state.filter.dateFilter.start).format('YYYY-MM-DD'),
  endDate: moment(state.filter.dateFilter.end).format('YYYY-MM-DD'),
  param: state.filter.param,
});

export const currentOperatorView = (
  state: SRCWEB.ApplicationState
): OperatorViewType => state.operators.view;

export const isOperatorSelected = (state: SRCWEB.ApplicationState): boolean =>
  !!state.operators.selectedOperator.operator;
