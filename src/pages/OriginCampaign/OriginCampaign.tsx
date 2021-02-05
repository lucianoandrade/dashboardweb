import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AnalyticsDatePicker from '../../components/AnalyticsDatePicker';
import LineChart from '../../components/charts/LineChart';
import { detailOriginCampaignAction } from '../../store/ducks/analytic/actions';
import formatter from '../../util/moneyFormatter';
import useStyles, { Bullet, MobileCard } from './styles';

interface StateToProps {
  dateInterval: DateInterval;
  intervalType: IntervalTypes;
  series: Array<AnalyticGQL.IDashboardOrigemCampanhaGranulado>;
  rows: Array<AnalyticGQL.IDashboardOrigemCampanhaPorDataConsolidado>;
}

const getColor = (index: number) =>
  ['#7DE315', '#14A0C1', '#F1C422', '#1A75BA'][index] || '#A0AAB5';

const OriginCampaignPage: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { dateInterval, intervalType, series, rows } = useSelector<
    SRCWEB.ApplicationState,
    StateToProps
  >((state) => ({
    dateInterval: state.analytic.dateInterval,
    intervalType: state.analytic.filterChart,
    series: state.analytic.dashboardOriginCampaign?.granulado ?? [],
    rows: state.analytic.dashboardOriginCampaign?.consolidado ?? [],
  }));

  const [localDateInterval, setLocalDateInterval] = React.useState<
    DateInterval
  >(dateInterval);
  const [localIntervalType, setLocalIntervalType] = useState<IntervalTypes>(
    intervalType
  );
  const [selected, setSelected] = React.useState<Array<string>>([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(detailOriginCampaignAction.request(localDateInterval));
  }, [localDateInterval, dispatch]);

  React.useEffect(() => {
    if (selected.length === 0) {
      setSelected(series.slice(0, 4).map((serie) => `${serie.identificador}`));
    } else {
      setSelected((selected) =>
        selected.filter((identificador) =>
          series.find((serie) => `${serie.identificador}` === identificador)
        )
      );
    }
  }, [selected.length, series]);

  const handleToggleSerie = (identificador: string) => {
    if (selected.includes(identificador)) {
      setSelected((selected) =>
        selected.filter((ident) => ident !== identificador)
      );
    } else {
      if (selected.length > 3) return;
      setSelected((selected) => [...selected, identificador]);
    }
  };

  return (
    <>
      <Box className={styles.bg}>
        <Box className={styles.header}>
          <Box className={styles.content}>
            <Typography variant='h2'>Origem do Acesso e Campanhas</Typography>
            {mobile ? null : (
              <Box className={styles.breadCrumb}>
                <Link to='/analitico'>Indicadores Auto Negociador</Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <p>Origem do Acesso e Campanhas</p>
              </Box>
            )}
          </Box>
        </Box>
        <Box className={styles.mainContent}>
          <Box className={styles.mainInput}>
            <AnalyticsDatePicker
              onChange={setLocalDateInterval}
              values={localDateInterval}
              selected={localIntervalType}
              setSelected={setLocalIntervalType}
              global
            />
          </Box>
          <Box className={styles.graphPages}>
            <LineChart
              value={series
                .filter((serie) => selected.includes(`${serie.identificador}`))
                .slice(0, 4)
                .map((serie) => ({
                  name: `${serie.identificador}`,
                  data:
                    serie.valores?.map((v) => ({
                      x: `${v.chave}`,
                      y: parseInt(`${v.valor}`, 10),
                    })) || [],
                }))}
            />
            <Box className={styles.graphpage}>
              {series
                .filter((serie) => selected.includes(`${serie.identificador}`))
                .slice(0, 4)
                .map((serie) => (
                  <div className={styles.page}>
                    <button
                      onClick={() =>
                        handleToggleSerie(`${serie.identificador}`)
                      }
                      type='button'
                      className={
                        (styles as { [key: string]: string })[
                          `pagBox${
                            selected.findIndex(
                              (identificador) =>
                                identificador === `${serie.identificador}`
                            ) + 1
                          }`
                        ]
                      }
                    >
                      {' '}
                    </button>
                    {serie.identificador}
                  </div>
                ))}
            </Box>
          </Box>
          <Box className={styles.viewPage}>
            <Typography variant='h4' className={styles.viewPageTitle}>
              Detalhamento
            </Typography>
            <div className={styles.line} />
            <Box className={styles.viewPages}>
              {!mobile && (
                <Table>
                  <TableHead>
                    <TableRow style={{ background: 'transparent' }}>
                      <TableCell>Origem / Campanha</TableCell>
                      <TableCell>Qtd. Acessos</TableCell>
                      <TableCell>Qtd | Valor Boletos</TableCell>
                      <TableCell>Qtd | Valor Negociações</TableCell>
                      <TableCell>Qtd | Valor Pix</TableCell>
                      <TableCell>Mais detalhes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow>
                        <TableCell
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Bullet
                            onClick={() =>
                              handleToggleSerie(`${row.urlEntrada}`)
                            }
                            color={getColor(
                              selected.findIndex(
                                (identificador) =>
                                  identificador === `${row.urlEntrada}`
                              )
                            )}
                          />
                          {row.urlEntrada}
                        </TableCell>
                        <TableCell>{row.qtdAcessos}</TableCell>
                        <TableCell>
                          {row.qtdBoletos}
                          {' | '}
                          {`${formatter.format(row.vlrBoletos ?? 0)}`}
                        </TableCell>
                        <TableCell>
                          {row.qtdNegociacoes}
                          {' | '}
                          {`${formatter.format(row.vlrNegociacoes ?? 0)}`}
                        </TableCell>
                        <TableCell>
                          {row.qtdPix}
                          {' | '}
                          {`${formatter.format(row.vlrPix ?? 0)}`}
                        </TableCell>
                        <TableCell>
                          <Link to={`/origemcampanha/${row.urlEntrada}`}>
                            <FontAwesomeIcon
                              icon={faEye}
                              style={{ marginRight: '4px', color: '#1A75BA' }}
                            />
                            Detalhes
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {mobile &&
                rows.map((row) => (
                  <MobileCard>
                    <div className='head'>
                      <Bullet
                        className='square-button'
                        onClick={() => handleToggleSerie(`${row.urlEntrada}`)}
                        color={getColor(
                          selected.findIndex(
                            (identificador) =>
                              identificador === `${row.urlEntrada}`
                          )
                        )}
                      />
                      <Link
                        className='link'
                        to={`/origemcampanha/${row.urlEntrada}`}
                      >
                        {row.urlEntrada}
                      </Link>
                      <span className='quantity'>{row.qtdAcessos}</span>
                    </div>
                    <div className='info'>
                      <strong>Boletos: </strong>
                      {row.qtdBoletos}
                      {' | '}
                      {`${formatter.format(row.vlrBoletos ?? 0)}`}
                    </div>
                    <div className='info'>
                      <strong>Negociações: </strong>
                      {row.qtdNegociacoes}
                      {' | '}
                      {`${formatter.format(row.vlrNegociacoes ?? 0)}`}
                    </div>
                    <div className='info'>
                      <strong>Pix: </strong>
                      {row.qtdPix}
                      {' | '}
                      {`${formatter.format(row.vlrPix ?? 0)}`}
                    </div>
                  </MobileCard>
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OriginCampaignPage;
