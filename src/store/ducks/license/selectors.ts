/**
 * Recupera somente o valor de "shouldLogout" para uso dentro do redux/saga
 * @param state Estado da aplicação
 */
export const shouldLogout = (state: SRCWEB.ApplicationState) =>
  state.license.shouldLogout;
