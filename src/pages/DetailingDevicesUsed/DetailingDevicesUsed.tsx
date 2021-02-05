import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnalyticsDatePicker from '../../components/AnalyticsDatePicker';
import { dashboardDispositivos } from '../../store/ducks/analytic/actions';
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import LineGraph from '../../components/charts/LineChart/LineGraph';
import RaceGraph from '../../components/charts/RaceChart';

interface DetailingDevicesUsedProps {
  data: Array<AnalyticGQL.IDashboardDetalhamentoDispositivosUtilizadosDTO>;
  selectPosition: IntervalTypes;
  dateInterval: DateInterval;
}

const DetailingDevicesUsed: React.FC = () => {

  const { data, dateInterval, selectPosition } = useSelector<
  SRCWEB.ApplicationState,DetailingDevicesUsedProps>((state) => ({
    data: state.analytic.dashboardDispositivosUtilizados,
    dateInterval: state.analytic.dateInterval,
    selectPosition: state.analytic.filterChart,
  }));

  const dispatch = useDispatch();
  const [localDateInterval, setLocalDateInterval] = useState<DateInterval>(dateInterval);
  const [localSelected, setLocalSelected] = useState<IntervalTypes>(selectPosition);

  useEffect(() => {
    setLocalDateInterval(dateInterval);
    setLocalSelected(selectPosition);
  }, [dateInterval, dispatch, selectPosition]);
  useEffect(() => {
    dispatch(dashboardDispositivos.request(localDateInterval));
  }, [localDateInterval, dispatch]);

  const styles = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const convertArr = Object.values(data);
  const newArr = new Array;
  const sumArr = newArr.concat(convertArr[0], convertArr[1]);
  const dispositivosUtilizados = sumArr.filter(e => e ? e.porHora || e.porData : null);
  const navegadoresUtilizados = sumArr.filter(e => e ? e.chave || e.valor : null);
  
  return (
    <>
      <Box className={styles.bg}>
        <Box className={styles.header}>
          <Box className={styles.content}>
            <Typography variant='h2'>Dispositivos Utilizados</Typography>
            {mobile ? null : (
              <Box className={styles.breadCrumb}>
                <Link to='/analitico'>Indicadores Auto Negociador</Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <p>Dispositivos Utilizados</p>
              </Box>
            )}
          </Box>
        </Box>
        <Box className={styles.mainContent}>
          <Box className={styles.mainInput}>
            <AnalyticsDatePicker
              selected={localSelected}
              setSelected={setLocalSelected}
              onChange={setLocalDateInterval}
              values={localDateInterval}
            />
          </Box>
          <Box className={styles.graphDevicesBox}>
            <LineGraph dispositivosUtilizados={dispositivosUtilizados}/>
          </Box>
          <Box className={styles.viewDevice}>
            <Typography variant='h4' className={styles.viewDeviceTitle}>
              Navegadores mais Utilizados
            </Typography>
            <div className={styles.line}></div>
            <RaceGraph navegadoresUtilizados={navegadoresUtilizados} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DetailingDevicesUsed;