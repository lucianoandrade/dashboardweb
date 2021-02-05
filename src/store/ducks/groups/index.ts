import { Reducer } from 'redux';

import {
  GroupRequestTypes,
  GroupViewTypes,
  GroupComparisonRequestTypes,
  GroupSelectAction,
} from './actions';

const INITIAL_STATE: GroupsState = {
  groups: [],
  groupsComparison: [],
  loading: true,
  view: 'list',
  viewBy: 'Performance',
  selectedGroup: undefined,
};

const GroupsReducer: Reducer<GroupsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GroupRequestTypes.SUCCESS:
      return {
        ...state,
        groups: action.payload,
        loading: false,
        selectedGroup: state.selectedGroup
          ? (action.payload as Array<Group>).find(
              (group) => group.COD_GROUP === state.selectedGroup?.COD_GROUP
            )
          : undefined,
      };
    case GroupComparisonRequestTypes.SUCCESS:
      return { ...state, groupsComparison: action.payload, loading: false };
    case GroupViewTypes.SETGROUPVIEW:
      return {
        ...state,
        view: action.payload,
      };
    case GroupViewTypes.SETGROUPVIEWBY:
      return {
        ...state,
        viewBy: action.payload,
      };
    case GroupSelectAction.SELECTGROUP:
      return { ...state, selectedGroup: action.payload };
    case GroupSelectAction.SELECT_FIRST_GROUP:
      return { ...state, selectedGroup: state.groups[0] };
    case 'persist/PURGE':
    case 'persist/REHYDRATE':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default GroupsReducer;
