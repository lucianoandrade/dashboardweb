import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import LineChart from '../../components/charts/LineChart';
import TablePages from '../../components/TablePages';
import useStyles from './styles';

const MostAccessedPages = () => {
  const styles = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [day, setDay] = useState('day');
  const [chart, setChart] = useState<Array<any>>([]);

  const handleDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDay(e.target.value);
  };

  const series = [
    {
      name: '/home',
      data: [10, 41, 35, 51, 49, 62, 69],
    },
    {
      name: '/store.html',
      data: [30, 50, 25, 31, 39, 52, 49],
    },
    {
      name: '/quickview.html',
      data: [20, 30, 15, 21, 29, 42, 59],
    },
    {
      name: '/signin.html',
      data: [8, 20, 45, 11, 19, 12, 39],
    },
  ];

  const selected = (name: string) => {
    const position = series.findIndex((val) => val.name === name);
    if (chart.findIndex((val) => val.name === name) === -1) {
      setChart([...chart, series[position]]);
    } else {
      setChart(chart.filter((e) => e.name !== name));
    }
  };

  return (
    <>
      <Box className={styles.bg}>
        <Box className={styles.header}>
          <Box className={styles.content}>
            <Typography variant='h2'>Páginas Mais Acessadas</Typography>
            {mobile ? null : (
              <Box className={styles.breadCrumb}>
                <Link to='/analitico'>Indicadores Auto Negociador</Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <p>Páginas Mais Acessadas</p>
              </Box>
            )}
          </Box>
        </Box>
        <Box className={styles.mainContent}>
          <Box className={styles.mainInput}>
            <TextField
              select
              value={day}
              onChange={handleDayChange}
              variant='outlined'
              size='small'
              fullWidth
            >
              <MenuItem value='day'>Hoje</MenuItem>
              <MenuItem value='week'>Esta Semana</MenuItem>
              <MenuItem value='month'>Ultimos 30 dias</MenuItem>
            </TextField>
          </Box>
          <Box className={styles.graphPages}>
            <LineChart value={chart} />
            <Box className={styles.graphpage}>
              <div className={styles.page}>
                <span className={styles.pagBox1}></span>/home
              </div>
              <div className={styles.page}>
                <span className={styles.pagBox2}></span>/store.html
              </div>
              <div className={styles.page}>
                <span className={styles.pagBox3}></span>/quickview.html
              </div>
              <div className={styles.page}>
                <span className={styles.pagBox4}></span>/signin.html
              </div>
            </Box>
          </Box>
          <Box className={styles.viewPage}>
            <Typography variant='h4' className={styles.viewPageTitle}>
              Detalhamento
            </Typography>
            <div className={styles.line}></div>
            <Box className={styles.viewPages}>
              <TablePages onClick={(name: string) => selected(name)} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = (): // state: SRCWEB.ApplicationState
any => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): any =>
  bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MostAccessedPages);
