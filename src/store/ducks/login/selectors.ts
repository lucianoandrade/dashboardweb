/**
 * Recupera apenas os dados de usuário para uso no redux/saga
 * @param state Estado da aplicação
 */
export const getUser = (state: SRCWEB.ApplicationState) => state.login.user;
