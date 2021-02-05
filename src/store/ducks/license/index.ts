import moment from 'moment';
import { Reducer } from 'redux';
import { PingTimeoutType } from './actions';

const INIT_STATE: LicenseState = {
  isCounting: false,
  shouldLogout: false,
  start: new Date(),
  dateInterval: {
    start: moment().subtract(1, 'month'),
    end: moment(),
  },
  selectedDate: '',
};
const timeoutLimit = 3 * 60 * 1000; // 3 Minutos

export const LicenseReducer: Reducer<LicenseState> = (
  state = INIT_STATE,
  action
) => {
  switch (action.type) {
    case PingTimeoutType.UPDATE:
      if (state.isCounting) {
        const now = new Date().getTime();
        const start = new Date(state.start).getTime();
        return {
          ...state,
          shouldLogout: now - start > timeoutLimit,
        };
      }
      return {
        ...state,
        isCounting: true,
        start: new Date(),
      };
    case PingTimeoutType.ABORT:
      return {
        ...state,
        isCounting: false,
        shouldLogout: false,
        start: new Date(),
      };
    case '@license/FETCH_INFO_SUCCESS':
      return {
        ...state,
        licenseInfo: action.payload,
      };
    case '@license/FETCH_DATA_SUCCESS':
      return {
        ...state,
        licenseUsage: action.payload,
      };
    case '@license/SELECT_DATE_INTERVAL':
      return {
        ...state,
        dateInterval: action.payload,
      };
    case '@license/SELECT_DATE':
      return {
        ...state,
        selectedDate: action.payload,
      };
    case 'persist/REHYDRATE':
      return INIT_STATE;
    default:
      return state;
  }
};

export default LicenseReducer;
