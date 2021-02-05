import {
  Container,
  Hidden,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { DateRangePicker, DateRangePickerProps } from 'rsuite';
import headerBg from '../../assets/img/pageHeaderBG.png';
import rangePickerConfig from '../../components/FilterBar/rangePickerConfig';
import {
  licenseData,
  licenseInfo,
  setLicenseInterval,
  setSelectedDate,
} from '../../store/ducks/license/actions';
import AccessChart from './AccessChart';
import { useStyles } from './DatePickerConfig';
import LicenseHeader from './LicenseHeader';
import LicenseUsageTable from './LicenseUsageTable';
import UsageDetailsSection from './UsageDetaisSection';

const Header = styled('div')(({ theme }) => ({
  background: `url('${headerBg}')`,
  // backgroundSize: 'contain',
  backgroundRepeat: 'repeat-x',
  backgroundPositionX: 'center',
  // height: '275px',
  paddingTop: '62px',
  marginBottom: '24px',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '16px',
  },
}));

const ChartSection = withStyles({
  root: {
    marginBottom: '24px',
  },
})(Container);
const ChartSectionTitle /* Bar */ = styled('div')(({ theme }) => ({
  padding: '30px 0px',
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    '& > *': {
      marginBottom: '8px',
    },
  },
}));
const ChartSectionData = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '410px auto',
  gridGap: '20px',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
const ChartSectionDataChart = styled('div')({
  padding: '20px',
  background: '#FFFFFF',
  border: '1px solid #DBE5ED',
  boxSizing: 'border-box',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
});

interface LicenseDashboardStateProps {
  license?: LicenseInfo;
  licenseUsage: Array<LicenseUsageData>;
  licenseInterval: DateInterval;
  selectedDate: string /* DD/MM/YYYY */;
}

interface LicenseDashboardDispatchProps {
  licenseInfo: typeof licenseInfo.request;
  licenseData: typeof licenseData.request;
  setLicenseInterval: typeof setLicenseInterval;
  setSelectedDate: typeof setSelectedDate;
}

type LicenseDashboardProps = LicenseDashboardStateProps &
  LicenseDashboardDispatchProps;

const LicenseDashboard = ({
  license,
  licenseUsage,
  licenseInfo,
  licenseData,
  licenseInterval,
  setLicenseInterval,
  selectedDate,
  setSelectedDate,
}: LicenseDashboardProps) => {
  useEffect(() => {
    licenseInfo();
    licenseData();
  }, [licenseData, licenseInfo]);

  const styles = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const rangePickerProps: DateRangePickerProps = rangePickerConfig(
    licenseInterval,
    (d) => setLicenseInterval(d),
    mobile,
    styles.dateRangePicker,
    styles.dateRangePickerMenu
  );
  if (mobile && selectedDate) {
    return <UsageDetailsSection selectedDate={selectedDate} mobile={mobile} />;
  }
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Header>
        <Container>
          <LicenseHeader license={license} licenseInfo={licenseInfo} />
        </Container>
      </Header>
      <ChartSection>
        <ChartSectionTitle>
          <Typography variant='h2'>Licenças</Typography>
          <DateRangePicker {...rangePickerProps} />
        </ChartSectionTitle>
        <ChartSectionData>
          <LicenseUsageTable
            licenseUsage={licenseUsage}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          <Hidden smDown>
            <ChartSectionDataChart>
              <AccessChart
                accesses={licenseUsage}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </ChartSectionDataChart>
          </Hidden>
        </ChartSectionData>
      </ChartSection>
      <UsageDetailsSection selectedDate={selectedDate} mobile={mobile} />
      <div
        id='rs-date-range-picker-container'
        className={styles.dateRangePickerContainer}
      />
    </div>
  );
};

const mapStateToProps = (
  state: SRCWEB.ApplicationState
): LicenseDashboardStateProps => {
  return {
    license: state.license.licenseInfo,
    licenseUsage: state.license.licenseUsage || [],
    licenseInterval: state.license.dateInterval,
    selectedDate: state.license.selectedDate,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch
): LicenseDashboardDispatchProps =>
  bindActionCreators(
    {
      licenseInfo: licenseInfo.request,
      licenseData: licenseData.request,
      setLicenseInterval,
      setSelectedDate,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LicenseDashboard);
