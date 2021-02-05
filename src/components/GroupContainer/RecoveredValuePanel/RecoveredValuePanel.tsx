import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import formatter from '../../../util/moneyFormatter';

const useStyles = makeStyles((theme) => ({
  goals: {
    padding: '16px',
  },
  row: {
    display: 'flex',
    margin: '8px 0px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '20px',
    alignItems: 'center',
    color: '#1F191A',
    '& > *:last-child': {
      marginLeft: 'auto',
    },
  },
  bullet: {
    height: '20px',
    width: '4px',
    borderRadius: '2px',
    marginRight: '7px',
    display: 'inline-block',
    '&.red': {
      backgroundColor: '#C73228',
    },
    '&.yellow': {
      backgroundColor: '#F1C422',
    },
    '&.green': {
      backgroundColor: '#4CBE22',
    },
  },
  recoveredRow: {
    padding: '8px 0px',
    fontFamily: 'Source Sans Pro',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#1A2C3B',

    display: 'grid',
    gridTemplateColumns: '1fr auto',
    '& > *:last-child': {
      justifySelf: 'end',
    },
  },
  totalValue: {
    float: 'right',
    minWidth: '21px',
  },
}));

const RecoveredValuesPanel: React.FC<GroupData> = (props: GroupData) => {
  const { values, goals } = props;
  const styles = useStyles();
  return (
    <Box className={styles.goals}>
      <Box className={styles.recoveredRow}>
        <h5>Valor de Promessas</h5>
        <span className={styles.totalValue}>
          {formatter.format(values.promisesValue)}
        </span>
      </Box>
      <Box className={styles.row}>
        <span className={`${styles.bullet} red`} />
        <span>Piso</span>
        <span>{formatter.format(goals.floor.promisesValue)}</span>
      </Box>
      <Box className={styles.row}>
        <span className={`${styles.bullet} yellow`} />
        <span>Meta</span>
        <span>{formatter.format(goals.standard.promisesValue)}</span>
      </Box>
      <Box className={styles.row}>
        <span className={`${styles.bullet} green`} />
        <span>Supermeta</span>
        <span>{formatter.format(goals.super.promisesValue)}</span>
      </Box>
      <Box className={styles.recoveredRow}>
        <h5>Valor de Pagamento</h5>
        <span className={styles.totalValue}>
          {formatter.format(values.paymentValue)}
        </span>
      </Box>
      <Box className={styles.row}>
        <span className={`${styles.bullet} red`} />
        <span>Piso</span>
        <span>{formatter.format(goals.floor.paymentValue)}</span>
      </Box>
      <Box className={styles.row}>
        <span className={`${styles.bullet} yellow`} />
        <span>Meta</span>
        <span>{formatter.format(goals.standard.paymentValue)}</span>
      </Box>
      <Box className={styles.row}>
        <span className={`${styles.bullet} green`} />
        <span>Supermeta</span>
        <span>{formatter.format(goals.super.paymentValue)}</span>
      </Box>
    </Box>
  );
};

export default RecoveredValuesPanel;
