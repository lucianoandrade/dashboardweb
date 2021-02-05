import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  useTheme,
  useMediaQuery,
  Hidden,
} from '@material-ui/core';
import moment from 'moment';

import {
  QuantitativeLineChart,
  QuantitativeLineChartMobile,
} from '../QuantitativeLineChart';
import useStyles from './styles';
import formatter from '../../../util/moneyFormatter';
import ButtonMobile from '../ButtonMobile';
import ComparisonChartMobileModal from '../ComparisonChartMobileModal';

interface QuantitativeComparisonProps {
  groups: Array<GroupComparison>;
  viewBy: GroupViewBy;
}

const Quantitative: React.FC<QuantitativeComparisonProps> = (
  props: QuantitativeComparisonProps
) => {
  const { groups, viewBy } = props;
  const sortedGroups = groups.map((group) => ({
    groupName: group.groupName,
    groupData: group.groupData.sort((a, b) => {
      if (a.key.length < 3) return Number(a.key) - Number(b.key);
      return (
        moment(a.key, 'YYYY-MM-DD').valueOf() -
        moment(b.key, 'YYYY-MM-DD').valueOf()
      );
    }),
  }));

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

  return (
    <>
      <Hidden mdDown>
        <Box className={styles.container}>
          <Box className={styles.chart}>
            <QuantitativeLineChart
              series={sortedGroups}
              keys={
                sortedGroups.length
                  ? sortedGroups[0].groupData.map(
                      (gd) => {
                        return gd.key.length > 2
                          ? moment(gd.key).format('DD/MM/YYYY')
                          : gd.key;
                      }
                      // eslint-disable-next-line function-paren-newline
                    )
                  : []
              }
              viewBy={viewBy}
            />
          </Box>
        </Box>
      </Hidden>
      {mobile ? (
        groups[0]?.groupData.map((g, i) => (
          <Box className={styles.container}>
            <div className={styles.dataHeader}>
              <Typography variant='h4'>
                {g.key.length > 2
                  ? moment(g.key).format('DD/MM/YYYY')
                  : `${g.key}h`}
              </Typography>
            </div>
            <div className={styles.divisor} />
            <div className={styles.data}>
              {groups.map((g) => (
                <div>
                  {g.groupName}
                  {': '}
                  <strong>
                    {`${
                      viewBy === 'PromessaValue'
                        ? formatter.format(g.groupData[i].value)
                        : g.groupData[i].value
                    }`}
                  </strong>
                </div>
              ))}
            </div>
          </Box>
        ))
      ) : (
        <Box className={styles.container}>
          <div className={styles.dataHeader}>
            <Typography variant='h4'>Detalhamento</Typography>
          </div>
          <div className={styles.divisor} />
          <Box className={styles.data}>
            <Table aria-label='tabela de comparação de desempenho'>
              <TableHead>
                <TableRow style={{ backgroundColor: 'white' }}>
                  <TableCell>
                    <Typography classes={{ root: styles.headerText }}>
                      Data/Hora
                    </Typography>
                  </TableCell>
                  {sortedGroups.map((group) => (
                    <TableCell
                      align='center'
                      key={`groupCell${group.groupName}`}
                      className={styles.color}
                    >
                      <span>
                        <Typography classes={{ root: styles.headerText }}>
                          {group.groupName}
                        </Typography>
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedGroups.length &&
                  sortedGroups[0].groupData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((groupData, index) => (
                      <TableRow>
                        <TableCell>
                          {groupData.key.length > 2
                            ? moment(groupData.key).format('DD/MM/YYYY')
                            : `${groupData.key}h`}
                        </TableCell>
                        {sortedGroups.map((group) => (
                          <TableCell align='center'>
                            {viewBy === 'PromessaValue'
                              ? formatter.format(
                                  group.groupData.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                  )[index].value
                                )
                              : group.groupData.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )[index].value}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 31]}
              component='div'
              count={groups.length ? groups[0].groupData.length : 0}
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
      )}
      {mobile && <ButtonMobile onClick={() => setShowMobileChart(true)} />}
      {showMobileChart && (
        <ComparisonChartMobileModal
          onClick={() => setShowMobileChart(false)}
          Chart={() => (
            <div className={styles.barChartMobile}>
              <QuantitativeLineChartMobile
                series={sortedGroups}
                keys={
                  sortedGroups.length
                    ? sortedGroups[0].groupData.map((gd) => gd.key)
                    : []
                }
                viewBy={viewBy}
              />
            </div>
          )}
          title={
            {
              Performance: 'Performance',
              Acionamento: 'Quantidade de Acionamentos',
              Promessa: 'Quantidade de Promessas',
              PromessaValue: 'Valor de Promessas',
              Efetividade: 'Efetividade',
            }[viewBy]
          }
          groups={sortedGroups.map((g) => g.groupName)}
        />
      )}
    </>
  );
};

const mapStateToProps = (
  state: SRCWEB.ApplicationState
): QuantitativeComparisonProps => ({
  groups: state.groups.groupsComparison,
  viewBy: state.groups.viewBy,
});

export default connect(mapStateToProps)(Quantitative);
