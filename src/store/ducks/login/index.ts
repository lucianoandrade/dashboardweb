import { Reducer } from 'redux';
import {
  DbInfoTypes,
  LoginTypes,
  LogoutTypes,
  SupervisorType,
} from './actions';

const INITIAL_STATE: LoginState = {
  db: [],
  loading: false,
};

const LoginReducer: Reducer<LoginState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DbInfoTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case DbInfoTypes.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        db: action.payload.data,
      };
    case LoginTypes.LOAD_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
      };
    case 'persist/PURGE':
    case LogoutTypes.SUCCESS:
      return INITIAL_STATE;
    case SupervisorType:
      return {
        ...state,
        isSupervisor: action.payload,
      };
    default:
      return state;
  }
};

export default LoginReducer;
