import {
  Box,
  Button,
  ButtonGroup,
  Container,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { DateRangePicker, DateRangePickerProps } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import GroupComparison from '../../components/GroupComparison';
import GroupContainer from '../../components/GroupContainer';
import SubHeader from '../../components/SubHeader';
import {
  setChoosenInterval,
  setChoosenParam,
  setCustomInterval,
} from '../../store/ducks/filter/actions';
import {
  loadGroup,
  loadGroupComparison,
  setGroupView,
  setGroupViewBy,
} from '../../store/ducks/groups/actions';
import rangePickerConfig from './rangePickerConfig';
import useStyles from './styles';

interface GroupDashboardProps {
  choosenInterval: IntervalTypes;
  param: ParamTypes;
  dateFilter: DateInterval;
  view: GroupView;
  viewBy: GroupViewBy;
  setView(view: GroupView): void;
  setViewBy(viewBy: GroupViewBy): void;
  setChoosenInterval(data: IntervalTypes): void;
  setCustomInterval(data: DateInterval): void;
  setChoosenParam(param: ParamTypes): void;
  loadGroup(): void;
  loadGroupComparison(): void;
}

const GroupDashboard = (props: GroupDashboardProps) => {
  const {
    choosenInterval,
    param,
    dateFilter,
    loadGroup,
    loadGroupComparison,
    setCustomInterval,
    view,
    setView,
    viewBy,
    setViewBy,
  } = props;
  const styles = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [useCustomDate, setUseCustomDate] = useState<boolean>(
    choosenInterval === 'custom'
  );
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'custom') {
      setUseCustomDate(true);
    } else {
      setUseCustomDate(false);
    }
    props.setChoosenInterval(e.target.value as IntervalTypes);
  };
  const navigate = useNavigate();
  const handleTabChange = (view: GroupView) => {
    setView(view);
    navigate(view === 'list' ? '/grupos' : '/grupos/comparativos');
  };
  const rangePickerProps: DateRangePickerProps = useCustomDate
    ? rangePickerConfig(
      dateFilter,
      setCustomInterval,
      mobile,
      styles.dateRangePicker,
      styles.dateRangePickerMenu
    )
    : {};
  useEffect(() => {
    loadGroup();
    if (viewBy !== 'Performance') loadGroupComparison();
  }, [
    choosenInterval,
    dateFilter,
    param,
    viewBy,
    loadGroup,
    loadGroupComparison,
  ]);
  return (
    <>
      <SubHeader
        title='Dashboard de Grupos'
        selectedTab={view}
        tabItems={[
          {
            label: 'Lista de Grupos',
            view: 'list',
          },
          {
            label: mobile ? 'Comparativo' : 'Comparativo por grupos',
            view: 'comparison',
          },
        ]}
        tabChangeHandler={handleTabChange}
      />
      {/* Corpo da página */}
      <Box>
        <Container className={styles.bodyContainer}>
          {/* Controles */}
          <Box className={styles.controlsBox}>
            <Box>
              {view === 'comparison' ? (
                <TextField
                  select
                  value={viewBy}
                  onChange={(e) => setViewBy(e.target.value as GroupViewBy)}
                  variant='outlined'
                  size='small'
                  fullWidth
                >
                  <MenuItem value='Performance'>Desempenho por grupo</MenuItem>
                  <MenuItem value='Acionamento'>
                    Acionamentos Positivos
                  </MenuItem>
                  <MenuItem value='Promessa'>Quantidade de Promessas</MenuItem>
                  <MenuItem value='PromessaValue'>Valor de Promessas</MenuItem>
                </TextField>
              ) : null}
              <TextField
                select
                value={choosenInterval}
                onChange={handleDateChange}
                variant='outlined'
                size='small'
                fullWidth
              >
                <MenuItem value='day'>Hoje</MenuItem>
                <MenuItem value='week'>Esta Semana</MenuItem>
                <MenuItem value='month'>Este Mês</MenuItem>
                <MenuItem value='custom'>Periodo</MenuItem>
              </TextField>
              {useCustomDate ? (
                <DateRangePicker {...rangePickerProps} />
              ) : (
                  <></>
                )}
            </Box>
            <ButtonGroup color='primary' variant='outlined' fullWidth={mobile}>
              <Button
                onClick={() => props.setChoosenParam('cpf')}
                variant={param === 'contrato' ? 'outlined' : 'contained'}
              >
                CPF
              </Button>
              <Button
                onClick={() => props.setChoosenParam('contrato')}
                variant={param === 'cpf' ? 'outlined' : 'contained'}
              >
                Contrato
              </Button>
            </ButtonGroup>
          </Box>
          <Routes>
            <Route path='/' element={<GroupContainer />} />
            <Route path='comparativos' element={<GroupComparison />} />
          </Routes>
        </Container>
      </Box>
      <div
        id='rs-date-range-picker-container'
        className={styles.dateRangePickerContainer}
      />
    </>
  );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  choosenInterval: state.filter.choosenInterval,
  param: state.filter.param,
  dateFilter: state.filter.dateFilter,
  view: state.groups.view,
  viewBy: state.groups.viewBy,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setChoosenInterval,
      setChoosenParam,
      loadGroup,
      setCustomInterval,
      setView: setGroupView,
      setViewBy: setGroupViewBy,
      loadGroupComparison,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(GroupDashboard);
