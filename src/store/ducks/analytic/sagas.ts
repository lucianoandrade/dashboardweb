import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import {
  activeUsersDayHour,
  pageMostAccess,
  dispositivoUtilizado,
  dashboardDispositivos,
  activeUsersNow,
  resumoGrafico,
  dashboardTop10Negociacoes,
  dashboardDesistencias,
  dashboardTop10OrigemCampanha,
  detailActiveNowAction,
  detailOriginCampaignAction,
} from './actions';

const momentDefaultFormat = 'YYYY-MM-DD';
type AnalyticsInterval = {
  initialDate: string;
  finalDate: string;
};
const generateInitialFinalDate = (
  payload: DateInterval
): AnalyticsInterval => ({
  initialDate: payload.start.format(momentDefaultFormat),
  finalDate: payload.end.format(momentDefaultFormat),
});

export function* activeUsersByDayHourSaga(
  action: ReturnType<typeof activeUsersDayHour.request>
): Generator {
  try {
    const response = yield call(
      api.usersByDayHour,
      generateInitialFinalDate(action.payload)
    );
    yield put(
      activeUsersDayHour.success(
        response as AnalyticGQL.IUsuariosPorDiaDaSemanaEHoraModel[]
      )
    );
  } catch (e) {
    yield put(activeUsersDayHour.failure(e.message));
  }
}

export function* activeUsersNowSaga(): Generator {
  try {
    const response: any = yield call(api.activeUsersNow);
    yield put(activeUsersNow.success(response));
  } catch (e) {
    yield put(activeUsersNow.failure(e.message));
  }
}

export function* activeTopTenSaga(
  action: ReturnType<typeof pageMostAccess.request>
): Generator {
  try {
    const response: any = yield call(
      api.getTopTenByAccess,
      generateInitialFinalDate(action.payload)
    );
    yield put(pageMostAccess.success(response));
  } catch (e) {
    yield put(pageMostAccess.failure(e.message));
  }
}

export function* activeDevicesUsedSaga(
  action: ReturnType<typeof dispositivoUtilizado.request>
): Generator {
  try {
    const response: any = yield call(
      api.devicesUsed,
      generateInitialFinalDate(action.payload)
    );
    yield put(dispositivoUtilizado.success(response));
  } catch (e) {
    yield put(dispositivoUtilizado.failure(e.message));
  }
}

export function* dashboardDevicesUsed(
  action: ReturnType<typeof dashboardDispositivos.request>
): Generator {
  try {
    const response: any = yield call(
      api.dashboardDevicesUsed,
      generateInitialFinalDate(action.payload)
    );
    yield put(dashboardDispositivos.success(response));
  } catch (e) {
    yield put(dashboardDispositivos.failure(e.message));
  }
}

export function* dashboardTop10OrigemCampanhaSaga(
  action: ReturnType<typeof dashboardTop10OrigemCampanha.request>
): Generator {
  try {
    const response: any = yield call(
      api.dashboardTop10OrigemCampanha,
      generateInitialFinalDate(action.payload)
    );
    yield put(dashboardTop10OrigemCampanha.success(response));
  } catch (e) {
    yield put(dashboardTop10OrigemCampanha.failure(e.message));
  }
}

export function* dashboardDesistenciasSaga(
  action: ReturnType<typeof dashboardDesistencias.request>
): Generator {
  try {
    const response: any = yield call(
      api.dashboardDesistencias,
      generateInitialFinalDate(action.payload)
    );
    yield put(dashboardDesistencias.success(response));
  } catch (e) {
    yield put(dashboardDesistencias.failure(e.message));
  }
}

export function* dashboardTop10NegociacoesSaga(
  action: ReturnType<typeof dashboardTop10Negociacoes.request>
): Generator {
  try {
    const response: any = yield call(
      api.dashboardTop10Negociacoes,
      generateInitialFinalDate(action.payload)
    );
    yield put(dashboardTop10Negociacoes.success(response));
  } catch (e) {
    yield put(dashboardTop10Negociacoes.failure(e.message));
  }
}

export function* detailActiveNowSaga(
  action: ReturnType<typeof detailActiveNowAction.request>
): Generator {
  try {
    const response: any = yield call(
      api.detailActiveUsersNow,
      action.payload || 0
    );
    yield put(detailActiveNowAction.success(response));
  } catch (e) {
    yield put(detailActiveNowAction.failure(e.message));
  }
}
export function* detailOriginCampaignSaga(
  action: ReturnType<typeof detailOriginCampaignAction.request>
): Generator {
  try {
    const response: any = yield call(
      api.detailOriginCampaignSaga,
      generateInitialFinalDate(action.payload)
    );
    yield put(detailOriginCampaignAction.success(response));
  } catch (e) {
    yield put(detailOriginCampaignAction.failure(e.message));
  }
}

export function* resumoGraficoSaga(
  action: ReturnType<typeof resumoGrafico.request>
): Generator {
  try {
    const data = generateInitialFinalDate(action.payload);
    const resumoUsuariosLogados: any = yield call(api.abstractUserChart, data);

    const resumoSessions: any = yield call(api.abstractSessions, data);

    const resumoGraficoPagamentos: any = yield call(api.abstractPayments, data);

    const dashboardResumo: any = yield call(api.abstractDashboard, data);

    const resumoGraficoBoletos: any = yield call(api.abstractChartPaper, data);

    const resumoGraficoAcordos: any = yield call(
      api.abstractAgreementChart,
      data
    );

    const resumoGraficoPropostas: any = yield call(
      api.abstractProposalChart,
      data
    );

    yield put(
      resumoGrafico.success({
        resumoUsuariosLogados,
        resumoSessions,
        resumoGraficoPagamentos,
        resumoGraficoBoletos,
        resumoGraficoAcordos,
        resumoGraficoPropostas,
        dashboardResumo,
        loading: false,
      })
    );
  } catch (e) {
    yield put(resumoGrafico.failure(e.message));
  }
}

export default all([
  takeLatest(activeUsersDayHour.request, activeUsersByDayHourSaga),
  takeLatest(activeUsersNow.request, activeUsersNowSaga),
  takeLatest(pageMostAccess.request, activeTopTenSaga),
  takeLatest(resumoGrafico.request, resumoGraficoSaga),
  takeLatest(dispositivoUtilizado.request, activeDevicesUsedSaga),
  takeLatest(dashboardDispositivos.request, dashboardDevicesUsed),
  takeLatest(resumoGrafico.request, resumoGraficoSaga),
  takeLatest(dashboardTop10Negociacoes.request, dashboardTop10NegociacoesSaga),
  takeLatest(dashboardDesistencias.request, dashboardDesistenciasSaga),
  takeLatest(
    dashboardTop10OrigemCampanha.request,
    dashboardTop10OrigemCampanhaSaga
  ),
  takeLatest(detailActiveNowAction.request, detailActiveNowSaga),
  takeLatest(detailOriginCampaignAction.request, detailOriginCampaignSaga),
]);
