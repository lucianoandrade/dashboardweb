import { Reducer } from 'redux';
import moment from 'moment';
import { SetFilterTypes } from './actions';

const INITIAL_STATE: FilterState = {
  param: 'cpf',
  choosenInterval: 'day',
  dateFilter: {
    end: moment(),
    start: moment(),
  },
};

let newState;

const FilterReducer: Reducer<FilterState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SetFilterTypes.SETCUSTOMDATEINTERVAL:
      return {
        ...state,
        dateFilter: {
          start: action.payload.start,
          end: action.payload.end,
        },
        choosenInterval: 'custom',
      };
    case SetFilterTypes.SETDATEINTERVAL:
      if (action.payload === 'custom') {
        return { ...state, choosenInterval: 'custom' };
      }
      newState = {
        ...state,
        choosenInterval: action.payload,
        loading: true,
      };
      newState.dateFilter.start =
        action.payload === 'week'
          ? moment().startOf(action.payload).add(1, 'day')
          : moment().startOf(action.payload);
      newState.dateFilter.end = moment().endOf('day');
      return newState;
    case SetFilterTypes.SETPARAM:
      return { ...state, param: action.payload, loading: true };
    default:
      return state;
  }
};

export default FilterReducer;
