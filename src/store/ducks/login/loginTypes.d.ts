declare type loginRequestType = {
  type: LoginTypes.LOAD_REQUEST;
  payload: {
    data: LoginDTO;
  };
};

// Data Types
declare interface DbInfo {
  dbName: string;
  number: number;
}

// State types
declare interface LoginState {
  readonly db: DbInfo[];
  readonly loading: boolean;
  readonly user?: GQL.ISigninResponseDto;
  readonly error?: Error;
  readonly logo?: string;
  readonly isSupervisor?: boolean;
}
