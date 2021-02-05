import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Login from '../pages/Login';
import GroupDashboard from '../pages/GroupDashboard';
import OperatorDashboard from '../pages/OperatorDashboard';
import OperatorView from '../pages/OperatorView';
import { pingSagaRequest } from '../store/ducks/license/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Chat from '../components/Chat';
import LicenseDashboard from '../pages/LicenseDashboard';
import Analytic from '../pages/Analytic';
import MostAccessedPages from '../pages/MostAccessedPages';
import DetailingDevicesUsed from '../pages/DetailingDevicesUsed';
import ActiveNow from '../pages/ActiveNow';
import OriginCampaignPage from '../pages/OriginCampaign';
import DetailingDropoutsPage from '../pages/DetailingDropouts';

interface RoutesProps {
  loginToken?: string;
  pingSagaRequest: () => void;
}

const AppRoutes = (props: RoutesProps) => {
  const { loginToken, pingSagaRequest } = props;
  useEffect(() => {
    if (loginToken) pingSagaRequest();
  }, [loginToken, pingSagaRequest]);

  return (
    <BrowserRouter>
      {loginToken ? (
        <>
          <Header />
          <div style={{ minHeight: '80vh', marginTop: '60px' }}>
            <Routes>
              <Route path='operadores/*' element={<OperatorDashboard />} />
              <Route path='grupos/*' element={<GroupDashboard />} />
              <Route path='perfil/*' element={<OperatorView />} />
              <Route path='licenca/*' element={<LicenseDashboard />} />
              <Route path='analitico/*' element={<Analytic />} />
              <Route path='maisacessadas/*' element={<MostAccessedPages />} />
              <Route path='dispositivosutilizados/*' element={<DetailingDevicesUsed />} />
              <Route path='origemcampanha/*' element={<OriginCampaignPage />} />
              <Route path='desistencias/*' element={<DetailingDropoutsPage />} />
              <Route path='ativosagora/*' element={<ActiveNow />} />
              <Route path='*' element={<Navigate to='/grupos' />} />
            </Routes>
          </div>
          <Footer />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  loginToken: state.login.user?.token,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ pingSagaRequest }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
