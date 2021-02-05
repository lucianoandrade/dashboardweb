import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BasicChart from '../../components/charts/BasicChart';
import TableActive from '../../components/TableActive';
import { Data } from '../../components/TableActive/data';
import { detailActiveNowAction } from '../../store/ducks/analytic/actions';
import useStyles from './styles';

const generateChartSeries = (
  byMinute: AnalyticGQL.IDetailActiveNowHour | undefined
) => [
  {
    name: '',
    data:
      byMinute?.values
        .sort((a, b) => {
          const [ahora, bhora] = [a.hora ?? 0, b.hora ?? 0];
          if (ahora > bhora) return 1;
          if (ahora < bhora) return -1;
          const [aminuto, bminuto] = [a.minuto ?? 0, b.minuto ?? 0];
          if (aminuto > bminuto) return 1;
          if (aminuto < bminuto) return -1;
          return 0;
        })
        .map((v) => ({
          y: v.valor ?? 0,
          x: moment()
            .hour(v.hora as number)
            .minute(v.minuto as number)
            .format('HH:mm'),
        })) ?? [],
  },
];

const ActiveNow: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [page, setPage] = React.useState(0);

  const dispatch = useDispatch();
  React.useEffect(() => {
    const detailInterval = () => {
      dispatch(detailActiveNowAction.request(page));
    };
    detailInterval();
    const intervalId = setInterval(detailInterval, 60000);

    return () => clearInterval(intervalId);
  }, [dispatch, page]);

  const dataArray = useSelector<
    SRCWEB.ApplicationState,
    Array<AnalyticGQL.IDetailActiveNowHour>
  >((state) => state.analytic.detailActiveNow);

  const activeNow =
    dataArray.find((data) => data.indicador === 'SessoesAtivas')?.values[0]
      .valor ?? 0;

  const byMinute = dataArray.find(
    (data) => data.indicador === 'detailActiveNowHour'
  );

  const list = dataArray.find((data) => data.indicador === 'detailActiveNow');

  const total =
    list?.values.reduce(
      (prev, curr) => (curr.valor ? prev + curr.valor : prev),
      0
    ) ?? 0;
  const rows: Data[] =
    list?.values.map(
      (v): Data => ({
        acao: v.acao ?? '',
        valor: v.valor ?? 0,
        porc: `${Math.round(((v.valor ?? 0) / total) * 100)}%`,
      })
    ) ?? [];

  return (
    <>
      <Box className={styles.bg}>
        <Box className={styles.header}>
          <Box className={styles.content}>
            <Typography style={{ fontWeight: 700 }} variant='h2'>
              {`Usuários Ativos Agora: ${activeNow}`}
            </Typography>
            {mobile ? null : (
              <Box className={styles.breadCrumb}>
                <Link to='/analitico'>Indicadores Auto Negociador</Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <p>Usuários Ativos Agora</p>
              </Box>
            )}
          </Box>
        </Box>
        <Box className={styles.mainContent}>
          {!mobile ? (
            <Box className={styles.graphPage}>
              <div className={styles.detail}>
                <Typography variant='h4' className={styles.viewPageTitle}>
                  Exibições de página por minuto
                </Typography>
                <p className={styles.text}>Exibições da última hora</p>
              </div>
              <div className={styles.line} />
              <Box className={styles.viewPages}>
                <div className={styles.top}>
                  <BasicChart series={generateChartSeries(byMinute)} />
                </div>
              </Box>
            </Box>
          ) : (
            <>
              <div className={styles.detail}>
                <Typography variant='h4' className={styles.viewPageTitle}>
                  Exibições de página por minuto
                </Typography>
                <p className={styles.text}>Exibições da última hora</p>
              </div>
              <Box className={styles.graphPage}>
                <Box className={styles.viewPages}>
                  <div className={styles.top}>
                    <BasicChart series={generateChartSeries(byMinute)} />
                  </div>
                </Box>
              </Box>
            </>
          )}
          <Box className={styles.viewPage}>
            <Typography variant='h4' className={styles.viewPageTitle2}>
              Detalhamento
            </Typography>
            <div className={styles.line} />
            <Box className={styles.viewPages}>
              <TableActive page={page} setPage={setPage} rows={rows} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ActiveNow;
