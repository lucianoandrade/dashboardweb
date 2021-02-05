import { Reducer } from 'redux';
import {
  OperatorRequestTypes,
  OperatorComparisonRequestTypes,
  OperatorViewTypes,
  OperatorDetailsTypes,
  OperatorSelectTypes,
  ShowOnChart,
  OperatorHistoryTypes,
} from './actions';

const INITIAL_STATE: OperatorsState = {
  operators: [],
  operatorsComparison: [],
  showOnChart: [],
  selectedOperator: {
    operator: undefined,
    details: undefined,
    history: undefined,
  },
  view: 'list',
  viewBy: 'Performance',
  loading: true,
};

const OperatorsReducer: Reducer<OperatorsState> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case OperatorRequestTypes.LOAD:
      return {
        ...state,
        loading: true,
      };
    case OperatorRequestTypes.SUCCESS:
      return {
        ...state,
        operators: action.payload,
        loading: false,
      };
    case '@OperatorOwnData/SUCCESS':
      return {
        ...state,
        selectedOperator: action.payload,
      };
    case OperatorSelectTypes.CLEAN:
      return { ...state, selectedOperator: INITIAL_STATE.selectedOperator };
    case OperatorDetailsTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        selectedOperator: {
          ...state.selectedOperator,
          details: action.payload,
        },
      };
    case OperatorHistoryTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        selectedOperator: {
          ...state.selectedOperator,
          history: action.payload,
        },
      };
    case OperatorComparisonRequestTypes.SUCCESS:
      return {
        ...state,
        operatorsComparison: action.payload,
        loading: false,
      };
    case OperatorSelectTypes.SET: {
      return {
        ...state,
        loading: false,
        selectedOperator: {
          ...state.selectedOperator,
          operator: action.payload,
        },
      };
    }
    case OperatorViewTypes.SETPAGEVIEW:
      return {
        ...state,
        view: action.payload,
      };
    case OperatorViewTypes.SETPAGEVIEWBY:
      return {
        ...state,
        viewBy: action.payload,
      };
    case ShowOnChart.SET:
      return {
        ...state,
        showOnChart: action.payload,
      };
    case 'persist/PURGE':
    case 'persist/REHYDRATE':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default OperatorsReducer;
