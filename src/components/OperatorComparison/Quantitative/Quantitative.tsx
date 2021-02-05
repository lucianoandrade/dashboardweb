import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import {
  Box,
  Checkbox,
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import {
  loadOperatorComparison,
  setShowOnChart,
} from '../../../store/ducks/operators/actions';
import BarChart from '../QuantitativeChart';

import useStyles, { colorArray } from '../styles';
import formatter from '../../../util/moneyFormatter';
import ButtonMobile from '../../GroupComparison/ButtonMobile';
import OperatorMobileChart from '../OperatorMobileChart';

const maxOperatorsOnChart = 8;

interface QuantitativeProps {
  operators: Array<Operator>;
  comparisonData: Array<OperatorComparison>;
  goals?: Goals;
  filter: FilterState;
  viewBy: OperatorViewBy;
  showOnChart: Array<number>;
  setShowOnChart(data: Array<number>): void;
  loadOperatorComparison(): void;
}

const Quantitative: React.FC<QuantitativeProps> = (
  props: QuantitativeProps
) => {
  const {
    comparisonData,
    operators,
    loadOperatorComparison,
    filter,
    viewBy,
    showOnChart,
    setShowOnChart,
  } = props;

  useEffect(() => {
    loadOperatorComparison();
  }, [loadOperatorComparison, filter, viewBy]);
  useEffect(() => {
    setShowOnChart(
      comparisonData.slice(0, maxOperatorsOnChart).map((op) => op.operatorCode)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operators]);

  const getGoalFromOperator = (goal: keyof Goals) => {
    const firstOperator = operators[0];
    if (firstOperator) {
      const goalTypesDict: Record<typeof viewBy, keyof GroupValue> = {
        Acionamento: 'actuation',
        Promessa: 'promises',
        PromessaValue: 'promisesValue',
        Performance: 'actuation',
        Efetividade: 'promiseActuationRatio',
      };
      return firstOperator.metas[goal][goalTypesDict[viewBy]];
    }
    return 0;
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
  const handleIncludeExclude = (operatorCode: number) => {
    const operator = showOnChart.find(
      (codeInChart) => operatorCode === codeInChart
    );
    if (operator) {
      setShowOnChart(
        showOnChart.filter((codeInChart) => codeInChart !== operatorCode)
      );
    } else if (showOnChart.length < maxOperatorsOnChart) {
      setShowOnChart(
        comparisonData
          .filter(
            (cpd) =>
              !!showOnChart.find((soc) => soc === cpd.operatorCode) ||
              cpd.operatorCode === operatorCode
          )
          .map((cpd) => cpd.operatorCode)
      );
    }
  };
  const handleIncludeAll = () => {
    if (
      showOnChart.length === maxOperatorsOnChart ||
      showOnChart.length === comparisonData.length
    ) {
      return setShowOnChart([]);
    }
    const operatorsLoginOriginal = comparisonData.map((op) => op.operatorCode);
    // Array que será modificado com .shift()
    const operatorsLogin = [...operatorsLoginOriginal];
    let newList = [...showOnChart];
    // Adicionar respeitando os operadores já na lista
    while (newList.length < maxOperatorsOnChart && operatorsLogin.length) {
      const newOp = operatorsLogin.shift();
      const isInList = !!newList.find((op) => op === newOp);
      if (!isInList) newList.push(newOp as number);
    }
    // Manter uma ordem análoga ao array original
    newList = operatorsLoginOriginal.filter(
      (op) => newList.findIndex((nl) => op === nl) > -1
    );
    return setShowOnChart(newList);
  };

  const operatorsInChartFilter = (op: OperatorComparison) =>
    showOnChart.find((codeInChart) => codeInChart === op.operatorCode);

  return (
    <>
      <Hidden smDown>
        <div className={[styles.box, styles.chart].join(' ')}>
          <BarChart
            series={comparisonData
              .filter(operatorsInChartFilter)
              .map((cpData) => ({
                name: cpData.operatorName,
                data: cpData.operatorData.map((data) => data.value),
              }))}
            keys={
              comparisonData.length > 0
                ? comparisonData[0].operatorData.map(
                    (opData) => moment(opData.key).format('DD/MM/YYYY')
                    // eslint-disable-next-line function-paren-newline
                  )
                : ['']
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
              <div>
                <FontAwesomeIcon
                  icon={faSearch}
                  className={styles.searchBarIcon}
                />
                <input
                  type='text'
                  placeholder='Buscar Operador...'
                  value={nameFilter}
                  className={styles.searchBar}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
              </div>
            </div>
            <Box className={styles.listTable}>
              <Typography>
                <Checkbox
                  color='primary'
                  checked={
                    showOnChart.length === maxOperatorsOnChart ||
                    showOnChart.length === comparisonData.length
                  }
                  onChange={handleIncludeAll}
                />
                Marcar/Desmarcar todos
              </Typography>
              <div className={styles.overflowX}>
                <Table aria-label='tabela de comparação de desempenho'>
                  <TableHead>
                    <TableRow style={{ backgroundColor: 'white' }}>
                      <TableCell>
                        <Typography classes={{ root: 'styles.headerText' }}>
                          Data/Hora
                        </Typography>
                      </TableCell>
                      {comparisonData
                        .filter((op) => {
                          const regex = new RegExp(nameFilter, 'i');
                          return regex.test(op.operatorName);
                        })
                        .map((cpData) => (
                          <TableCell
                            align='center'
                            key={`opCell${cpData.operatorName}${Math.random()}`}
                            className={[
                              styles.tableHeadCell,
                              `checkedColor${
                                showOnChart.findIndex(
                                  (code) => code === cpData.operatorCode
                                ) % colorArray.length
                              }`,
                            ].join(' ')}
                          >
                            <div>
                              <Checkbox
                                color='primary'
                                classes={{
                                  checked: 'checkedColor',
                                }}
                                checked={
                                  !!showOnChart.find(
                                    (code) => code === cpData.operatorCode
                                  )
                                }
                                onChange={() => {
                                  handleIncludeExclude(cpData.operatorCode);
                                }}
                                disabled={
                                  !showOnChart.find(
                                    (code) => code === cpData.operatorCode
                                  ) && showOnChart.length >= maxOperatorsOnChart
                                }
                              />
                              <span>
                                <Typography
                                  classes={{ root: 'styles.headerText' }}
                                >
                                  {cpData.operatorName}
                                </Typography>
                              </span>
                            </div>
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {comparisonData.length &&
                      comparisonData[0].operatorData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((cpData, index) => (
                          <TableRow key={`tablerow${cpData.key}`}>
                            <TableCell style={{ minWidth: '110px' }}>
                              {cpData.key.length > 2
                                ? moment(cpData.key).format('DD/MM/YYYY')
                                : `${cpData.key}h`}
                            </TableCell>
                            {comparisonData
                              .filter((op) => {
                                const regex = new RegExp(nameFilter, 'i');
                                return regex.test(op.operatorName);
                              })
                              .map((cpData) => (
                                <TableCell
                                  key={`tablerow-${Math.random() * 1324}`}
                                  align='center'
                                >
                                  {viewBy === 'PromessaValue'
                                    ? formatter.format(
                                        cpData.operatorData.slice(
                                          page * rowsPerPage,
                                          page * rowsPerPage + rowsPerPage
                                        )[index]?.value || 0
                                      )
                                    : cpData.operatorData.slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                      )[index]?.value || 0}
                                </TableCell>
                              ))}
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </div>
              <TablePagination
                rowsPerPageOptions={[5, 10, 31]}
                component='div'
                count={
                  comparisonData.length
                    ? comparisonData[0].operatorData.length
                    : 0
                }
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
        {comparisonData.length > 0 &&
          comparisonData[0].operatorData.map((opData, i) => {
            const { key } = opData;
            return (
              <div
                key={`OperatorMobile-${Math.random() * 1234}`}
                className={`${styles.box} ${styles.itemMobile}`}
              >
                <div className={`${styles.commomHeader} ${styles.listHeader}`}>
                  <Typography variant='h4'>
                    {key.length > 2 ? moment(key).format('DD/MM/YYYY') : key}
                  </Typography>
                </div>
                <div className={styles.itemData}>
                  {comparisonData.map((cpData) => (
                    <Typography
                      key={`tablerow${Math.random() * 1234}`}
                      variant='body1'
                    >
                      {`${cpData.operatorName}: `}
                      <strong>{cpData.operatorData[i]?.value || 0}</strong>
                    </Typography>
                  ))}
                </div>
              </div>
            );
          })}
      </Hidden>
      <Hidden smUp>
        <ButtonMobile onClick={() => setShowMobileChart(true)} />
      </Hidden>
      {showMobileChart && (
        <OperatorMobileChart
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          onClick={() => setShowMobileChart(false)}
          handleIncludeAll={handleIncludeAll}
          allChecked={
            showOnChart.length === maxOperatorsOnChart ||
            showOnChart.length === comparisonData.length
          }
          Chart={() => (
            <div className={styles.boxMobile}>
              <BarChart
                series={comparisonData
                  .filter(operatorsInChartFilter)
                  .map((cpData) => ({
                    name: cpData.operatorName,
                    data: cpData.operatorData.map((data) => data.value),
                  }))}
                keys={
                  comparisonData.length > 0
                    ? comparisonData[0].operatorData.map((opData) => opData.key)
                    : ['']
                }
                serieName={viewBy}
                goals={{
                  floor: getGoalFromOperator('floor'),
                  standard: getGoalFromOperator('standard'),
                  super: getGoalFromOperator('super'),
                }}
              />
            </div>
          )}
          operators={comparisonData
            .filter((op) => {
              const regex = new RegExp(nameFilter, 'i');
              return regex.test(op.operatorName);
            })
            .map((op) => ({
              name: op.operatorName,
              handleClick: () => {
                handleIncludeExclude(op.operatorCode);
              },
              checked: !!showOnChart.find((name) => name === op.operatorCode),
              checkedIndex:
                showOnChart.findIndex((code) => code === op.operatorCode) %
                colorArray.length,
              disabled:
                !showOnChart.find((name) => name === op.operatorCode) &&
                showOnChart.length >= maxOperatorsOnChart,
            }))}
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
  showOnChart: state.operators.showOnChart,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ loadOperatorComparison, setShowOnChart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Quantitative);
