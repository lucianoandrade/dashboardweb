/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  ButtonGroup,
  Button,
  Hidden,
  Badge,
  Avatar,
  useTheme,
  useMediaQuery,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

import {
  setOperatorView,
  selectOperator,
} from '../../../store/ducks/operators/actions';

import useStyles from './styles';
import OperatorInfo from '../OperatorInfo';
import CustomAngleRadialChart from '../../charts/CustomAngleRadialChart';

import OperatorGoals from '../OperatorGoals/OperatorGoals';
import TimeBar from '../../TimeBar';

import defaultAvatar from '../../../assets/img/defaultAvatar.svg';
import SendMessageButton from '../../SendMessageButton';
import {
  createChat,
  selectChat,
  setShowChat,
} from '../../../store/ducks/chat/actions';

interface OperatorItemProps {
  operator: Operator;
  variant?: 'list' | 'history';
  setOperatorView(data: OperatorViewType): void;
  selectOperator(data: Operator): void;
  createChat: typeof createChat.success;
  selectChat: typeof selectChat;
  setShowChat: typeof setShowChat;
}

const OperatorItem: React.FC<OperatorItemProps> = (
  props: OperatorItemProps
) => {
  const {
    operator,
    selectOperator,
    setOperatorView,
    variant = 'list',
    createChat,
    selectChat,
    setShowChat,
  } = props;
  const styles = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isList = variant === 'list';
  const navigate = useNavigate();
  const handleLinks = (type: OperatorViewType, operator: Operator) => {
    setOperatorView(type);
    selectOperator(operator);
    navigate(
      type === 'details' ? '/operadores/detalhe' : '/operadores/historico'
    );
  };
  return (
    <Card className={styles.card}>
      <CardHeader
        avatar={
          isList ? (
            <Hidden smUp>
              <Badge
                classes={{
                  badge: operator.isOnline
                    ? styles.avatarOnline
                    : styles.avatarOffilne,
                }}
                badgeContent='1'
                variant='dot'
                overlap='circle'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <Avatar src={operator.urlAvatar}>
                  {/* Fallback do avatar */}
                  <img
                    style={{ height: '100%' }}
                    src={defaultAvatar}
                    alt='Avatar Padrão'
                  />
                </Avatar>
              </Badge>
            </Hidden>
          ) : null
        }
        className={styles.cardHeader}
        classes={{ action: styles.cardHeaderAction }}
        title={
          isList ? (
            <>
              <span>{operator.operatorName}</span>
              {mobile || (
                <SendMessageButton
                  onClick={() => {
                    createChat({
                      messages: [],
                      operatorId: operator.COD_RECUP,
                      operatorName: operator.operatorName,
                      haveNewMessage: true,
                    });
                    selectChat(operator.COD_RECUP);
                    setShowChat(true);
                  }}
                />
              )}
            </>
          ) : (
            'Resumo Operador'
          )
        }
        titleTypographyProps={{
          variant: 'h4',
        }}
        action={
          isList ? (
            <Box>
              <Hidden xsDown>
                <ButtonGroup
                  color='primary'
                  variant='text'
                  className={styles.cardHeaderButton}
                >
                  <Button onClick={(e) => handleLinks('details', operator)}>
                    Dados
                  </Button>
                  <Button onClick={(e) => handleLinks('history', operator)}>
                    {'Histórico do Operador >'}
                  </Button>
                </ButtonGroup>
              </Hidden>
              <Hidden smUp>
                <Button
                  variant='text'
                  onClick={(e) => handleLinks('details', operator)}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </Button>
              </Hidden>
            </Box>
          ) : null
        }
      />
      <Box className={styles.headerDivision} />
      <CardContent
        style={isList ? { padding: '0px 32px 0px 32px' } : { padding: '0px' }}
      >
        <Box className={styles[variant]}>
          {isList ? (
            <Hidden smDown>
              <Box className={styles.infoContainer}>
                <OperatorInfo
                  login={operator.operatorLogin}
                  photo={operator.urlAvatar}
                  pauseTime={operator.pauseTime}
                  pauseLimit={operator.pauseLimit}
                  metaAtendimento={
                    operator.metaAtendimento || operator.workTime || 0
                  }
                  workTime={operator.workTime || 0}
                  online={operator.isOnline || false}
                />
              </Box>
              <div
                className={isList ? styles.dividerlist : styles.dividerhistory}
              />
            </Hidden>
          ) : null}
          <Box className={isList ? styles.RadialContainer : undefined}>
            <CustomAngleRadialChart
              data={[
                {
                  label: 'Acionamentos',
                  color: '#1A75BA',
                  value: operator.acionamentoTotal,
                  maxValue: operator.metas.standard.actuation,
                  type: 'number',
                },
                {
                  label: 'Acion. Positivo',
                  color: '#14A0C1',
                  value: operator.acionamentoPositive,
                  maxValue: operator.metas.standard.positiveActuation,
                  type: 'number',
                },
              ]}
            />
          </Box>
          <div
            className={isList ? styles.dividerlist : styles.dividerhistory}
          />
          <Box className={isList ? styles.goalsContainer : undefined}>
            <OperatorGoals
              operator={operator}
              showText={!mobile}
              variant={variant}
            />
          </Box>
          {isList ? (
            <Hidden smUp>
              <div
                className={isList ? styles.dividerlist : styles.dividerhistory}
              />
              <Box className={styles.TimeBarBottom}>
                <TimeBar
                  title='ATENDIMENTO'
                  value={operator.workTime || 1}
                  maxValue={operator.metaAtendimento || operator.workTime || 1}
                />
                <TimeBar
                  title='PAUSA'
                  value={operator.pauseTime}
                  maxValue={operator.pauseLimit * 60}
                  type='mm:ss'
                  showMax
                />
              </Box>
            </Hidden>
          ) : (
            <div>
              <div
                className={isList ? styles.dividerlist : styles.dividerhistory}
              />
              <Box className={styles.TimeBarHistory}>
                <Typography
                  style={{
                    fontFamily: 'Source Sans Pro',
                    fontSize: '14px',
                    lineHeight: '18px',
                    color: '#1F191A',
                    marginBottom: '16px',
                  }}
                >
                  <strong>TEMPO DE ATENDIMENTO</strong>
                </Typography>
                <TimeBar
                  title='ATENDIMENTO'
                  value={operator.workTime || 1}
                  maxValue={operator.metaAtendimento || operator.workTime || 1}
                />
                <TimeBar
                  title='PAUSA'
                  value={operator.pauseTime}
                  maxValue={operator.pauseLimit * 60}
                  type='mm:ss'
                  showMax
                />
              </Box>
            </div>
          )}
        </Box>
      </CardContent>
      <Hidden smUp>
        <Box className={styles.cardEndButton}>
          <div className='gradient' />
          <Button onClick={(e) => handleLinks('details', operator)}>
            Dados
          </Button>
          <div className='divisor' />
          <Button onClick={(e) => handleLinks('history', operator)}>
            Histórico do Operador
          </Button>
        </Box>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '1px solid #DBE5ED',
            padding: '8px',
          }}
        >
          <SendMessageButton
            onClick={() => {
              createChat({
                messages: [],
                operatorId: operator.COD_RECUP,
                operatorName: operator.operatorName,
                haveNewMessage: true,
              });
              selectChat(operator.COD_RECUP);
              setShowChat(true);
            }}
          />
        </Box>
      </Hidden>
    </Card>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setOperatorView,
      selectOperator,
      createChat: createChat.success,
      selectChat,
      setShowChat,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(OperatorItem);
