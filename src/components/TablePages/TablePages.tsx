import React from 'react';
import { colors, rows } from './data';
import { useMediaQuery, useTheme } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import useStyles from './styles';
interface Props {
  onClick: (name: string) => void;
}

export default function StickyHeadTable(props: Props) {
  const { onClick } = props;

  const styles = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [page, setPage] = React.useState(0);
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
                    Página
                  </TableCell>
                  <TableCell className={styles.title} align='right'>
                    Exibições de Página
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((a, i) => {
                    return (
                      <TableRow key={i} onClick={() => onClick(a.name)}>
                        <TableCell
                          component='th'
                          scope='row'
                          align='left'
                          className={styles.pages}
                        >
                          <div
                            className={styles.box}
                            style={{ backgroundColor: colors[i] }}
                          ></div>
                          {a.name}
                        </TableCell>
                        <TableCell
                          component='th'
                          scope='row'
                          align='right'
                          className={styles.views}
                        >
                          {a.views}
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
                    <TableRow key={i} onClick={() => onClick(a.name)}>
                      <TableCell
                        component='th'
                        scope='row'
                        align='left'
                        className={styles.pages}
                      >
                        <div
                          className={styles.box}
                          style={{ backgroundColor: colors[i] }}
                        ></div>
                        {a.name}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                        align='right'
                        className={styles.views}
                      >
                        {a.views}
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
