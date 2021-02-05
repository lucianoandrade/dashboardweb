// Actions type

declare interface ListGroupsRequestType {
  type: GroupRequestTypes.LOAD;
  payload: {
    data: GQL.IRequestListGroupDto;
  };
}

// Data Types
declare interface GroupValue {
  actuation: number;
  promiseActuationRatio: number;
  positiveActuation: number;
  paymentValue: number;
  promises: number;
  promisesValue: number;
  effectiveTime: number;
}

declare interface GroupData {
  values: GroupValue;
  goals: {
    floor: GroupValue;
    standard: GroupValue;
    super: GroupValue;
  };
}

declare interface GroupDataComparison {
  key: string;
  value: number;
}

declare interface Group {
  COD_GROUP: number;
  groupName: string;
  groupData: GroupData;
}

declare interface GroupComparison {
  groupName: string;
  groupData: Array<GroupDataComparison>;
}

declare type GroupSort =
  | 'name'
  | 'actuation'
  | 'positiveActuation'
  | 'promises'
  | 'promisesValue';

declare type GroupView = 'list' | 'comparison';
declare type GroupViewBy =
  | 'Performance'
  | 'Acionamento'
  | 'Promessa'
  | 'PromessaValue'
  | 'Efetividade';

// State Types
declare interface GroupsState {
  groups: Array<Group>;
  groupsComparison: Array<GroupComparison>;
  loading: boolean;
  view: GroupView;
  viewBy: GroupViewBy;
  selectedGroup?: Group;
}
