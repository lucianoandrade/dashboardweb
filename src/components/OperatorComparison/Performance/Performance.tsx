import React, { useState, useEffect } from 'react';
import {
  useTheme,
  useMediaQuery,
  Hidden,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Typography,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faSort,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';

import useStyles from './styles';
import { maxOperatorsOnChart, chartPages } from '../constants';
import { unlockBodyScroll } from '../../../util/lockBodyScroll';
import ChartPaginationControl from '../ChartPaginationControl';
import BarChart from '../PerformanceChart';
import formatter from '../../../util/moneyFormatter';
import ButtonMobile from '../../GroupComparison/ButtonMobile';
import OperatorMobileChart from '../OperatorMobileChart';

interface OperatorPerformanceComparisonProps {
  operators: OperatorsState;
}

const Performance: React.FC<OperatorPerformanceComparisonProps> = (
  props: OperatorPerformanceComparisonProps
) => {
  const { operators } = props;

  const [nameFilter, setNameFilter] = useState('');
  const [showOnChart, setShowOnChart] = useState<Array<string>>([]);
  const handleIncludeExclude = (login: string) => {
    const operator = showOnChart.find((loginInChart) => login === loginInChart);
    if (operator) {
      setShowOnChart(
        showOnChart.filter((loginInChart) => loginInChart !== login)
      );
    } else if (showOnChart.length < maxOperatorsOnChart) {
      setShowOnChart([...showOnChart, login]);
    }
  };
  const handleIncludeAll = () => {
    if (
      showOnChart.length === maxOperatorsOnChart ||
      showOnChart.length === operators.operators.length
    ) {
      return setShowOnChart([]);
    }
    const operatorsLogin = operators.operators.map((op) => op.operatorLogin);
    const newList = [...showOnChart];
    while (newList.length < maxOperatorsOnChart && operatorsLogin.length) {
      const newOp = operatorsLogin.shift();
      const isInList = !!newList.find((op) => op === newOp);
      if (!isInList) newList.push(newOp as string);
    }
    return setShowOnChart(newList);
  };

  const [chartPage, setChartPage] = useState(0);
  const handleChartPageChange = (direction: 'prev' | 'next') => {
    switch (direction) {
      case 'prev':
        setChartPage(chartPage - 1);
        break;
      case 'next':
        setChartPage(chartPage + 1);
        break;
      default:
        setChartPage(0);
    }
  };

  const getGoalFromOperator = (goal: keyof Goals) => {
    const firstOperator = operators.operators[0];
    if (firstOperator) {
      return firstOperator.metas[goal][chartPages[chartPage].goalName];
    }
    return 0;
  };

  const operatorsInChartFilter = (op: Operator) =>
    showOnChart.find((loginInChart) => loginInChart === op.operatorLogin);

  const theme = useTheme();
  const styles = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [showMobileChart, setShowMobileChart] = useState<boolean>(true);

  useEffect(() => {
    if (!mobile) {
      setShowMobileChart(false);
      unlockBodyScroll();
    }
  }, [mobile]);
  useEffect(() => {
    setShowOnChart(
      operators.operators
        .slice(0, maxOperatorsOnChart)
        .map((op) => op.operatorLogin)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operators.operators]);

  const [operatorSortBy, setOperatorSortBy] = useState<{
    key: OperatorSort;
    reverse: boolean;
  }>({ key: 'COD_RECUP', reverse: true });
  const operatorSort = (property: OperatorSort, reverse: boolean) => (
    a: Operator,
    b: Operator
  ) => {
    if (a[property] < b[property]) {
      return reverse ? -1 : 1;
    }
    if (a[property] > b[property]) {
      return reverse ? 1 : -1;
    }
    return 0;
  };
  return (
    <>
      <main>
        <Hidden smDown>
          <div className={`${styles.box} ${styles.chart}`}>
            <ChartPaginationControl
              chartPage={chartPage}
              chartPages={chartPages}
              handleChartPageChange={handleChartPageChange}
            >
              <BarChart
                serieName={chartPages[chartPage].displayText}
                series={operators.operators
                  .filter(operatorsInChartFilter)
                  .map((op) => op[chartPages[chartPage].property] as number)}
                goals={{
                  floor: getGoalFromOperator('floor'),
                  standard: getGoalFromOperator('standard'),
                  super: getGoalFromOperator('super'),
                }}
                keys={operators.operators
                  .filter(operatorsInChartFilter)
                  .map((op) => op.operatorName)}
              />
            </ChartPaginationControl>
          </div>
          <div className={`${styles.box} ${styles.list}`}>
            <div className={`${styles.commomHeader} ${styles.listHeader}`}>
              <h4>Detalhamento</h4>
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
            <div className={styles.listTable}>
              <Table>
                <TableHead>
                  <TableRow className={styles.tableHead}>
                    <TableCell>
                      <Checkbox
                        color='primary'
                        checked={
                          showOnChart.length === maxOperatorsOnChart ||
                          showOnChart.length === operators.operators.length
                        }
                        onChange={handleIncludeAll}
                      />
                      Operador
                    </TableCell>
                    {chartPages.map((page) => (
                      <TableCell
                        key={`Operator-${Math.random() * 1234}`}
                        align='center'
                      >
                        <button
                          type='button'
                          style={{ background: 'transparent', outline: 'none' }}
                          onClick={() => {
                            setOperatorSortBy((state) => ({
                              key: page.property as OperatorSort,
                              reverse:
                                page.property === state.key
                                  ? !state.reverse
                                  : false,
                            }));
                          }}
                        >
                          {operatorSortBy.key === page.property ? (
                            <>
                              {page.displayText}
                              <FontAwesomeIcon
                                icon={
                                  operatorSortBy.reverse ? faSortUp : faSortDown
                                }
                                style={{ marginLeft: '8px' }}
                              />
                            </>
                          ) : (
                            <>
                              {page.displayText}
                              <FontAwesomeIcon
                                icon={faSort}
                                style={{ marginLeft: '8px' }}
                              />
                            </>
                          )}
                        </button>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {operators.operators
                    .filter((op) => {
                      const regex = new RegExp(nameFilter, 'i');
                      return regex.test(op.operatorName);
                    })
                    .sort(
                      operatorSort(operatorSortBy.key, operatorSortBy.reverse)
                    )
                    .map((op) => (
                      <TableRow key={`OperatorRow-${Math.random() * 1234}`}>
                        <TableCell>
                          <Checkbox
                            color='primary'
                            checked={
                              !!showOnChart.find(
                                (name) => name === op.operatorLogin
                              )
                            }
                            onChange={() => {
                              handleIncludeExclude(op.operatorLogin);
                            }}
                            disabled={
                              !showOnChart.find(
                                (name) => name === op.operatorLogin
                              ) && showOnChart.length >= maxOperatorsOnChart
                            }
                          />
                          {op.operatorName}
                        </TableCell>
                        <TableCell align='center'>
                          {op.acionamentoTotal}
                        </TableCell>
                        <TableCell align='center'>
                          {op.acionamentoPositive}
                        </TableCell>
                        <TableCell align='center'>{op.promessaTotal}</TableCell>
                        <TableCell align='center'>
                          {formatter.format(op.promessaValue)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Hidden>
        <Hidden mdUp>
          {operators.operators.map((op) => {
            const {
              acionamentoTotal,
              acionamentoPositive,
              promessaTotal,
              promessaValue,
              metas,
            } = op;
            return (
              <div
                key={`OperatorMobile-${Math.random() * 1234}`}
                className={`${styles.box} ${styles.itemMobile}`}
              >
                <div className={`${styles.commomHeader} ${styles.listHeader}`}>
                  <Typography variant='h4'>{op.operatorName}</Typography>
                </div>
                <div className={styles.itemData}>
                  <Typography variant='body1'>
                    {'Acionamento Total: '}
                    <strong>{acionamentoTotal}</strong>
                    <span className={styles.metaDisplay}>
                      {` / ${metas.standard.actuation}`}
                    </span>
                  </Typography>
                  <Typography variant='body1'>
                    {'Acionamentos positivos: '}
                    <strong>{acionamentoPositive}</strong>
                    <span className={styles.metaDisplay}>
                      {` / ${metas.standard.positiveActuation}`}
                    </span>
                  </Typography>
                  <Typography variant='body1'>
                    {'Qtd. de promessas: '}
                    <strong>{promessaTotal}</strong>
                    <span className={styles.metaDisplay}>
                      {` / ${metas.standard.promises}`}
                    </span>
                  </Typography>
                  <Typography variant='body1'>
                    {'Valor de promessas: '}
                    <strong>{formatter.format(promessaValue)}</strong>
                    <span className={styles.metaDisplay}>
                      {` / ${formatter.format(metas.standard.promisesValue)}`}
                    </span>
                  </Typography>
                </div>
              </div>
            );
          })}
        </Hidden>
      </main>

      <Hidden smUp>
        <ButtonMobile onClick={() => setShowMobileChart(true)} />
      </Hidden>
      {showMobileChart && (
        <OperatorMobileChart
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          onClick={() => setShowMobileChart(false)}
          Chart={() => (
            <div className={styles.boxMobile}>
              <ChartPaginationControl
                chartPage={chartPage}
                chartPages={chartPages}
                handleChartPageChange={handleChartPageChange}
                mobile
              >
                <BarChart
                  serieName={chartPages[chartPage].displayText}
                  series={operators.operators
                    .filter(operatorsInChartFilter)
                    .map((op) => op[chartPages[chartPage].property] as number)}
                  goals={{
                    floor: getGoalFromOperator('floor'),
                    standard: getGoalFromOperator('standard'),
                    super: getGoalFromOperator('super'),
                  }}
                  keys={operators.operators
                    .filter(operatorsInChartFilter)
                    .map((op) => op.operatorName)}
                />
              </ChartPaginationControl>
            </div>
          )}
          handleIncludeAll={handleIncludeAll}
          allChecked={
            showOnChart.length === maxOperatorsOnChart ||
            showOnChart.length === operators.operators.length
          }
          operators={operators.operators
            .filter((op) => {
              const regex = new RegExp(nameFilter, 'i');
              return regex.test(op.operatorName);
            })
            .map((op) => ({
              name: op.operatorName,
              handleClick: () => {
                handleIncludeExclude(op.operatorLogin);
              },
              checked: !!showOnChart.find((name) => name === op.operatorLogin),
              disabled:
                !showOnChart.find((name) => name === op.operatorLogin) &&
                showOnChart.length >= maxOperatorsOnChart,
            }))}
        />
      )}
    </>
  );
};

export default Performance;
