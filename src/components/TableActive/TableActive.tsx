import { useMediaQuery, useTheme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { rows } from './data';
import useStyles from './styles';

interface DataTable {
  rows: typeof rows;
  page: number;
  setPage(page: number): void;
}

export default function StickyHeadTable({ rows, page, setPage }: DataTable) {
  const styles = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {!mobile ? (
        <Paper className={styles.root}>
          <TableContainer className={styles.container}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <TableCell className={styles.title} align='left'>
                    Principais páginas ativas
                  </TableCell>
                  <TableCell className={styles.title2}>
                    Impressões de Página
                  </TableCell>
                  <TableCell className={styles.title2}>% do Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((a, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell
                          component='th'
                          scope='row'
                          align='left'
                          className={styles.pages}
                        >
                          {a.acao}
                        </TableCell>
                        <TableCell
                          component='th'
                          scope='row'
                          className={styles.views}
                        >
                          {a.valor}
                        </TableCell>
                        <TableCell
                          component='th'
                          scope='row'
                          className={styles.views}
                        >
                          {a.porc}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Paper className={styles.root}>
          <TableContainer className={styles.container}>
            <Table stickyHeader aria-label='sticky table'>
              <TableBody>
                {rows.map((a, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell
                        component='th'
                        scope='row'
                        align='left'
                        className={styles.pages}
                      >
                        {a.acao}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                        align='right'
                        className={styles.views}
                      >
                        <div className={styles.detail}>
                          <div className={styles.bold}>{a.valor} </div>
                          <div> | {a.porc}</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
}
