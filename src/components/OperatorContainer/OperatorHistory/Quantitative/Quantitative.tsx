import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  useTheme,
  useMediaQuery,
  Hidden,
} from '@material-ui/core';
import moment from 'moment';

import {
  loadOperatorHistory,
  setShowOnChart,
} from '../../../../store/ducks/operators/actions';
import BarChart from '../QuantitativeChart';

import { TabOptions } from '../../../../pages/OperatorDashboard/constants';
import useStyles from '../styles';
import formatter from '../../../charts/ChartTextFormater';
import ButtonMobile from '../../../GroupComparison/ButtonMobile';
import OperatorMobileChart from '../OperatorMobileChart';
import AvatarSrc from '../../../AvatarSrc';

const maxOperatorsOnChart = 8;

interface QuantitativeProps {
  operators: Array<Operator>;
  selectedOperator: SelectedOperator;
  comparisonData: Array<OperatorComparison>;
  goals?: Goals;
  filter: FilterState;
  viewBy: OperatorViewBy;
  showOnChart: Array<number>;
  setShowOnChart(data: Array<number>): void;
  loadOperatorHistory(): void;
}

const Quantitative: React.FC<QuantitativeProps> = (
  props: QuantitativeProps
) => {
  const {
    comparisonData,
    selectedOperator,
    loadOperatorHistory,
    filter,
    viewBy,
    showOnChart,
    setShowOnChart,
  } = props;
  const { history } = selectedOperator;
  useEffect(() => {
    loadOperatorHistory();
  }, [loadOperatorHistory, filter, viewBy]);
  useEffect(() => {
    if (showOnChart.length === 0) {
      setShowOnChart(
        comparisonData
          .slice(0, maxOperatorsOnChart)
          .map((op) => op.operatorCode)
      );
    }
  }, [viewBy, comparisonData, setShowOnChart, showOnChart.length]);

  const getGoalFromOperator = (goal: keyof Goals) => {
    const firstOperator = history;
    if (firstOperator) {
      const goalTypesDict: Record<typeof viewBy, keyof GroupValue> = {
        Acionamento: 'actuation',
        Promessa: 'promises',
        PromessaValue: 'promisesValue',
        Performance: 'promiseActuationRatio',
        Efetividade: 'promiseActuationRatio',
      };
      return Number.parseFloat(
        firstOperator.metas[goal][goalTypesDict[viewBy]].toFixed(2)
      );
    }
    return 0;
  };
  const formatText = (value: number) => {
    if (viewBy === 'Performance') {
      return formatter(value, 'percent');
    }
    if (viewBy === 'PromessaValue') {
      return formatter(value, 'BRL');
    }
    return formatter(value, 'number');
  };
  const [showMobileChart, setShowMobileChart] = useState<boolean>(false);

  const theme = useTheme();
  const styles = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    if (!mobile) setShowMobileChart(false);
  }, [mobile]);

  const [nameFilter, setNameFilter] = useState('');

  return (
    <>
      <Hidden smDown>
        <div className={[styles.box, styles.chart].join(' ')}>
          <BarChart
            series={[
              {
                name: 'teste',
                data:
                  history?.data?.map((d) =>
                    Number.parseFloat(d.value.toFixed(2))
                  ) || [],
              },
            ]}
            keys={
              history?.data?.map((d) => {
                return d.key.length > 2
                  ? moment(d.key).format('DD/MM/YYYY')
                  : d.key;
              }) || []
            }
            serieName={viewBy}
            goals={{
              floor: getGoalFromOperator('floor'),
              standard: getGoalFromOperator('standard'),
              super: getGoalFromOperator('super'),
            }}
          />
        </div>
        <div className={styles.box}>
          <Box>
            <div className={[styles.commomHeader, styles.listHeader].join(' ')}>
              <Typography variant='h4'>Detalhamento</Typography>
            </div>
            <Box className={styles.listTable}>
              <div className={styles.overflowX}>
                <Table aria-label='tabela de comparação de desempenho'>
                  <TableHead>
                    <TableRow style={{ backgroundColor: 'white' }}>
                      <TableCell>
                        <Typography classes={{ root: 'styles.headerText' }}>
                          Data/Hora
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography classes={{ root: 'styles.headerText' }}>
                          {
                            TabOptions.history.find((p) => p.value === viewBy)
                              ?.key
                          }
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography classes={{ root: 'styles.headerText' }}>
                          Piso
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography classes={{ root: 'styles.headerText' }}>
                          Meta
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography classes={{ root: 'styles.headerText' }}>
                          Supermeta
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {history?.data?.length &&
                      history?.data
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((cpData) => (
                          <TableRow key={`tablerow${cpData.key}`}>
                            <TableCell style={{ minWidth: '110px' }}>
                              {cpData.key.length > 2
                                ? moment(cpData.key).format('DD/MM/YYYY')
                                : `${cpData.key}h`}
                            </TableCell>
                            <TableCell align='left'>
                              {formatText(cpData.value)}
                            </TableCell>
                            <TableCell align='left'>
                              {formatText(getGoalFromOperator('floor'))}
                            </TableCell>
                            <TableCell align='left'>
                              {formatText(getGoalFromOperator('standard'))}
                            </TableCell>
                            <TableCell align='left'>
                              {formatText(getGoalFromOperator('super'))}
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </div>
              <TablePagination
                rowsPerPageOptions={[5, 10, 31]}
                component='div'
                count={history?.data?.length || 0}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage='Linhas por página:'
                labelDisplayedRows={(pgInfo) => {
                  const { from, to, count } = pgInfo;
                  return `${from}-${to} de ${count}`;
                }}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Box>
          </Box>
        </div>
      </Hidden>
      <Hidden mdUp>
        {(history &&
          history.data?.length > 0 &&
          history?.data?.map((opData, i) => {
            const { key } = opData;
            return (
              <div
                key={`OperatorMobile-${Math.random() * 1234}`}
                className={`${styles.box} ${styles.itemMobile}`}
              >
                <div className={`${styles.commomHeader} ${styles.listHeader}`}>
                  <Typography variant='h4'>{key}</Typography>
                </div>
                <div className={styles.itemData}>
                  <Typography variant='body1'>
                    {`${
                      TabOptions.history.find((p) => p.value === viewBy)?.key
                    }: `}
                    <strong>
                      {viewBy !== 'PromessaValue'
                        ? opData.value
                        : formatter(opData.value, 'BRL')}
                    </strong>
                  </Typography>
                  <Typography variant='body1'>
                    {'Piso: '}
                    <strong>
                      {viewBy !== 'PromessaValue'
                        ? getGoalFromOperator('floor')
                        : formatter(getGoalFromOperator('floor'), 'BRL')}
                    </strong>
                  </Typography>
                  <Typography variant='body1'>
                    {'Meta: '}
                    <strong>
                      {viewBy !== 'PromessaValue'
                        ? getGoalFromOperator('standard')
                        : formatter(getGoalFromOperator('standard'), 'BRL')}
                    </strong>
                  </Typography>
                  <Typography variant='body1'>
                    {'Supermeta: '}
                    <strong>
                      {viewBy !== 'PromessaValue'
                        ? getGoalFromOperator('super')
                        : formatter(getGoalFromOperator('super'), 'BRL')}
                    </strong>
                  </Typography>
                </div>
              </div>
            );
          })) || <div />}
      </Hidden>
      <Hidden mdUp>
        <ButtonMobile onClick={() => setShowMobileChart(true)} />
      </Hidden>
      {showMobileChart && (
        <OperatorMobileChart
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          onClick={() => setShowMobileChart(false)}
          headerTitle={TabOptions.history.find((p) => p.value === viewBy)?.key}
          title={selectedOperator.operator?.operatorName}
          Avatar={() => (
            <AvatarSrc
              img={selectedOperator.operator?.urlAvatar}
              isOnline={selectedOperator.operator?.isOnline || false}
            />
          )}
          Chart={() => (
            <div className={styles.boxMobile}>
              <BarChart
                series={[
                  {
                    name: 'teste',
                    data: history?.data?.map((d) => d.value) || [],
                  },
                ]}
                keys={history?.data?.map((d) => d.key) || []}
                serieName='Teste'
                goals={{
                  floor: getGoalFromOperator('floor'),
                  standard: getGoalFromOperator('standard'),
                  super: getGoalFromOperator('super'),
                }}
              />
            </div>
          )}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: SRCWEB.ApplicationState) => ({
  comparisonData: state.operators.operatorsComparison,
  goals: state.groups.selectedGroup?.groupData.goals,
  filter: state.filter,
  viewBy: state.operators.viewBy,
  operators: state.operators.operators,
  selectedOperator: state.operators.selectedOperator,
  showOnChart: state.operators.showOnChart,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ loadOperatorHistory, setShowOnChart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Quantitative);
