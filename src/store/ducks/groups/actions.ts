import { action, Action } from 'typesafe-actions';

export enum GroupRequestTypes {
  LOAD = '@group/LOAD',
  SUCCESS = '@group/SUCCESS',
  FAILURE = '@group/FAILURE',
}

export enum GroupSelectAction {
  SELECTGROUP = '@groupSelect/SELECTGROUP',
  SELECT_FIRST_GROUP = '@groupSelect/SELECT_FIRST_GROUP',
}

export enum GroupComparisonRequestTypes {
  LOAD = '@groupComparison/LOAD',
  SUCCESS = '@groupComparison/SUCCESS',
  FAILURE = '@groupComparison/FAILURE',
}

export enum GroupViewTypes {
  SETGROUPVIEW = '@groupView/SETGROUPPAGE',
  SETGROUPVIEWBY = '@groupView/SETGROUPVIEWBY',
}

export const loadGroup = (): Action => action(GroupRequestTypes.LOAD);

export const loadGroupSuccess = (data: Array<Group>): Action =>
  action(GroupRequestTypes.SUCCESS, data);

export const loadGroupComparison = (): Action =>
  action(GroupComparisonRequestTypes.LOAD);

export const loadGroupComparisonSuccess = (
  data: Array<GroupComparison>
): Action => action(GroupComparisonRequestTypes.SUCCESS, data);

export const setSelectedGroup = (data: Group | undefined): Action =>
  action(GroupSelectAction.SELECTGROUP, data);
export const selectFirstGroup = (): Action =>
  action(GroupSelectAction.SELECT_FIRST_GROUP);

export const setGroupView = (data: GroupView): Action =>
  action(GroupViewTypes.SETGROUPVIEW, data);

export const setGroupViewBy = (data: GroupViewBy): Action =>
  action(GroupViewTypes.SETGROUPVIEWBY, data);
