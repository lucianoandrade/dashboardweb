import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ChartSectionDataTable = styled('div')({
  background: '#FFFFFF',
  border: '1px solid #DBE5ED',
  boxSizing: 'border-box',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const MobileContainer = styled('div')({});
const MobileItem = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'auto 136px',
  gridTemplateRows: '16px',
  alignItems: 'center',
  background: '#FFFFFF',
  border: '1px solid #DBE5ED',
  boxSizing: 'border-box',
  borderRadius: '4px',
  padding: '25px 20px',
  marginBottom: '20px',
});

type Props = {
  licenseUsage: Array<LicenseUsageData>;
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

const useStyles = makeStyles({
  headerText: {
    fontWeight: 'bold',
  },
  tableHover: {
    '&:hover': {
      backgroundColor: '#1A75BA !important',
      '& *': {
        color: 'white !important',
      },
    },
  },
  selectedDate: {
    backgroundColor: '#1A75BA !important',
    '& *': {
      color: 'white !important',
    },
  },
});

const LicenseUsageTable = ({
  licenseUsage,
  onSelectDate,
  selectedDate,
}: Props): JSX.Element => {
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
  const styles = useStyles();
  const handleClick = (date: string) => {
    onSelectDate(selectedDate === date ? '' : date);
  };
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  if (selectedDate !== '' && mobile) return <></>;
  return mobile ? (
    <MobileContainer>
      {licenseUsage.map((usage) => (
        <MobileItem key={usage.date} onClick={() => handleClick(usage.date)}>
          <Typography style={{ color: '#1F191A' }}>{usage.date}</Typography>
          <Typography
            style={{
              fontSize: '19px',
              fontWeight: 700,
              color: '#1A2C3B',
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'flex-end',
            }}
          >
            {usage.quantity}
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{
                marginLeft: '20px',
                height: '13px',
              }}
            />
          </Typography>
        </MobileItem>
      ))}
    </MobileContainer>
  ) : (
    <ChartSectionDataTable>
      <Table aria-label='tabela de comparação de desempenho'>
        <TableHead>
          <TableRow style={{ backgroundColor: 'white' }}>
            <TableCell>
              <Typography classes={{ root: styles.headerText }}>
                Data/Hora
              </Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography classes={{ root: styles.headerText }}>
                Quantidade
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {licenseUsage
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((usage) => (
              <TableRow
                key={usage.date}
                onClick={() => handleClick(usage.date)}
                classes={{
                  selected: styles.selectedDate,
                  root: styles.tableHover,
                }}
                selected={selectedDate === usage.date}
                style={{ cursor: 'pointer' }}
              >
                <TableCell style={{ minWidth: '110px' }}>
                  {usage.date}
                  {/* {moment(usage.date).format('DD/MM/YYYY')} */}
                </TableCell>
                <TableCell align='center'>{usage.quantity}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component='div'
        count={licenseUsage.length || 0}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage=''
        labelDisplayedRows={(pgInfo) => {
          const { from, to, count } = pgInfo;
          return `${from}-${to} de ${count}`;
        }}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </ChartSectionDataTable>
  );
};

export default LicenseUsageTable;
