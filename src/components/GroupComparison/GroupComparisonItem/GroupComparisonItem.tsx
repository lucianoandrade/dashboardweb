import React from 'react';
import {
  useMediaQuery,
  useTheme,
  TableRow,
  TableCell,
  makeStyles,
  Typography,
} from '@material-ui/core';

type GroupComparisonItemProps = GroupComparison.GroupData;

const formatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const useStyles = makeStyles((theme) => ({
  color: {
    '& > :first-child': {
      display: 'flex',
      alignItems: 'center',
      '&::before': {
        content: '""',
        display: 'inline-block',
        height: '16px',
        width: '16px',
        background: '#A0AAB5',
        borderRadius: '2px',
        marginRight: '12px',
      },
    },
    '&:nth-child(1) > :first-child::before': {
      background: '#7DE315',
    },
    '&:nth-child(2) > :first-child::before': {
      background: '#14A0C1',
    },
    '&:nth-child(3) > :first-child::before': {
      background: '#F1C422',
    },
    '&:nth-child(4) > :first-child::before': {
      background: '#5159AC',
    },
  },
  itemMobile: {
    background: '#FFFFFF',
    border: '1px solid #DBE5ED',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.12), 0px 0px 4px #FFFFFF',
    borderRadius: '4px',
    marginBottom: '24px',
  },
  itemMobileHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '1px 20px',
    height: '57px',
  },
  divisor: {
    display: 'block',
    height: '11px',
    width: 'inherit',
    marginTop: '-11px',
    background:
      'linear-gradient(180deg, rgba(219, 229, 237, 0) 0%, rgba(219, 229, 237, 0.4) 100%)',
  },
  itemData: {
    padding: '20px',
    paddingTop: '16px',
    '& > p': {
      marginBottom: '8px',
    },
  },
  metaDisplay: {
    color: '#A0AAB5',
  },
}));

const GroupComparisonItem: React.FC<GroupComparisonItemProps> = (
  props: GroupComparisonItemProps
) => {
  const {
    name,
    actuation,
    positiveActuation,
    promises,
    promisesValue,
    goal,
  } = props;
  const theme = useTheme();
  const styles = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  return mobile ? (
    <div className={styles.itemMobile}>
      <div className={styles.itemMobileHeader}>
        <Typography variant='h4'>{name}</Typography>
      </div>
      <div className={styles.divisor} />
      <div className={styles.itemData}>
        <Typography variant='body1'>
          {'Acionamentos: '}
          <strong>{actuation}</strong>
          <span className={styles.metaDisplay}>{` / ${goal.actuation}`}</span>
        </Typography>
        <Typography variant='body1'>
          {'Acionamentos positivos: '}
          <strong>{positiveActuation}</strong>
          <span className={styles.metaDisplay}>
            {` / ${goal.positiveActuation}`}
          </span>
        </Typography>
        <Typography variant='body1'>
          {'Qtd. de promessas: '}
          <strong>{promises}</strong>
          <span className={styles.metaDisplay}>{` / ${goal.promises}`}</span>
        </Typography>
        <Typography variant='body1'>
          {'Valor de promessas: '}
          <strong>{formatter.format(promisesValue)}</strong>
          <span className={styles.metaDisplay}>
            {` / ${formatter.format(goal.promisesValue)}`}
          </span>
        </Typography>
      </div>
    </div>
  ) : (
    <TableRow key={name} className={styles.color}>
      <TableCell component='th' scope='row'>
        {name}
      </TableCell>
      <TableCell align='center'>
        {actuation}
        <span className={styles.metaDisplay}>{` / ${goal.actuation}`}</span>
      </TableCell>
      <TableCell align='center'>
        {positiveActuation}
        <span className={styles.metaDisplay}>
          {` / ${goal.positiveActuation}`}
        </span>
      </TableCell>
      <TableCell align='center'>
        {promises}
        <span className={styles.metaDisplay}>{` / ${goal.promises}`}</span>
      </TableCell>
      <TableCell align='center'>
        {formatter.format(promisesValue)}
        <span className={styles.metaDisplay}>
          {` / ${formatter.format(goal.promisesValue)}`}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default GroupComparisonItem;
