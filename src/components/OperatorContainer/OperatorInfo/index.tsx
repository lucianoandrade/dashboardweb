import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Avatar, Box } from '@material-ui/core';
import TimeBar from '../../TimeBar';
import StatusContainer from './StatusCotainer';
import defaultAvatar from '../../../assets/img/defaultAvatar.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    hr: {
      flexGrow: 1,
    },
    rightText: {
      textAlign: 'right',
    },
    image: {
      width: '80px',
      height: '80px',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    statusContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    statusIcon: {
      backgroundColor: '#4CBE22',
      boxShadow: 'inset 0px 3px 4px rgba(0, 0, 0, 0.18)',
      width: '16px',
      height: '16px',
      display: 'inline-block',
      marginRight: '8px',
      borderRadius: '8px',
    },
    timeBarContainer: {
      marginTop: theme.spacing(3),
    },
  })
);
interface OperatorInfoProps {
  login: string;
  photo: string;
  online: boolean;
  pauseLimit: number;
  metaAtendimento: number;
  pauseTime: number;
  workTime: number;
}
export default (props: OperatorInfoProps) => {
  const {
    login,
    photo,
    pauseTime,
    metaAtendimento,
    pauseLimit,
    online,
    workTime,
  } = props;
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Grid
        container
        justify='center'
        alignItems='center'
        direction='column'
        spacing={2}
      >
        <Grid item container alignItems='center' direction='row' spacing={3}>
          <Grid item>
            <Avatar
              style={{ border: '1px solid #DBE5ED' }}
              src={photo}
              className={styles.image}
            >
              {/* Fallback do avatar */}
              <img
                style={{ height: '100%' }}
                src={defaultAvatar}
                alt='Avatar Padrão'
              />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography
              style={{
                fontSize: '20px',
                lineHeight: '25px',
                color: '#1F191A',
                width: '130px',
                wordWrap: 'break-word',
              }}
            >
              <strong>{login}</strong>
            </Typography>
            <StatusContainer online={online} />
          </Grid>
        </Grid>
      </Grid>
      <Box>
        <hr />
      </Box>
      <Box>
        <TimeBar
          title='ATENDIMENTO'
          value={workTime}
          maxValue={metaAtendimento}
        />
      </Box>
      <Box className={styles.timeBarContainer}>
        <TimeBar
          title='PAUSA'
          value={pauseTime}
          maxValue={pauseLimit * 60}
          showMax
        />
      </Box>
    </Box>
  );
};
