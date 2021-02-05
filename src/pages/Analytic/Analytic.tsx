import { Container, styled, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import headerBg from '../../assets/img/pageHeaderBG.png';
import AnalyticsDatePicker from '../../components/AnalyticsDatePicker';
import {
  handleLoading,
  selectFilter,
  setDateInterval,
} from '../../store/ducks/analytic/actions';
import Abstract from './Abstract';
import DevicesUsed from './DevicesUsed';
import Dropouts from './Dropouts';
import MostTraded from './MostTraded';
import OriginCampaign from './OriginCampaign';
import PagesAccess from './PagesAccess';
import UserActiveNow from './UserActiveNow';
import UserPerDay from './UserPerDay';

const Header = styled('div')(({ theme }) => ({
  background: `url('${headerBg}')`,
  backgroundRepeat: 'repeat-x',
  backgroundPositionX: 'center',
  paddingTop: '62px',
  marginBottom: '24px',
  paddingBottom: '12px',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '16px',
  },
}));

const Row = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const Title = withStyles({
  root: {
    marginBottom: '32px',
  },
})(Typography);

const ChartSection = withStyles({
  root: {
    marginBottom: '24px',
  },
})(Container);

const Subtitle = withStyles({
  root: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
})(Typography);

interface AnalyticDashboardProps {
  dateInterval: DateInterval;
  filterChart: IntervalTypes;
  loading: boolean;
  selectFilter: typeof selectFilter;
  handleLoading: typeof handleLoading;
  setDateInterval: typeof setDateInterval;
}

const Analytic = ({
  dateInterval,
  filterChart,
  loading,
  selectFilter,
  setDateInterval,
}: AnalyticDashboardProps) => {
  return (
    <>
      <Header>
        <Container>
          <Title variant='h2'>Indicadores Autonegociador</Title>
        </Container>
      </Header>
      <ChartSection>
        <Row>
          <Subtitle variant='h3'>Negociações</Subtitle>
          <AnalyticsDatePicker
            onChange={setDateInterval}
            selected={filterChart}
            setSelected={selectFilter}
            values={dateInterval}
            style={{ marginBottom: '20px' }}
            global
          />
        </Row>
        <Row>
          <Abstract />
          <UserActiveNow />
          <UserPerDay />
          <PagesAccess />
          <OriginCampaign />
          <DevicesUsed />
          <MostTraded />
          <Dropouts />
        </Row>
      </ChartSection>
    </>
  );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  filterChart: state.analytic.filterChart,
  loading: state.analytic.loading,
  dateInterval: state.analytic.dateInterval,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setDateInterval,
      selectFilter,
      handleLoading,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Analytic);
