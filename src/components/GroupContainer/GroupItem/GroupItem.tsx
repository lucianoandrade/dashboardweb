import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  ButtonGroup,
  Button,
  Hidden,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import useStyles from './styles';
import Chart from '../../charts/CustomAngleRadialChart';
import RecoveredValuePanel from '../RecoveredValuePanel';
import PerformanceDataPanel from '../PerformanceDataPanel';
import PolarChart from '../PolarChart';
import { setSelectedGroup } from '../../../store/ducks/groups/actions';
import { setOperatorView } from '../../../store/ducks/operators/actions';
import SendMessageButton from '../../SendMessageButton';
import {
  selectGroupChat,
  setShowChat,
} from '../../../store/ducks/chat/actions';
import api from '../../../services/api';

type GroupItemProps = Group & {
  vertical?: boolean;
  selectGroupChat: typeof selectGroupChat;
  setShowChat: typeof setShowChat;
};

const GroupItem: React.FC<GroupItemProps> = (props: GroupItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    COD_GROUP,
    groupName,
    groupData,
    vertical,
    selectGroupChat,
    setShowChat,
  } = props;
  const { values, goals } = groupData;

  const styles = useStyles();
  const handleLinks = (type: OperatorViewType) => {
    dispatch(setOperatorView(type));
    dispatch(setSelectedGroup({ COD_GROUP, groupName, groupData }));
    navigate(type === 'comparison' ? '/operadores/comparativo' : '/operadores');
  };
  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        title={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <>
            <span>{groupName}</span>
            {mobile || vertical || (
              <SendMessageButton
                onClick={() => {
                  api
                    .getOperatorsIds(COD_GROUP)
                    .then((operatorsId) => {
                      selectGroupChat({
                        groupName,
                        operatorsId,
                      });
                    })
                    .then(() => {
                      setShowChat(true);
                    });
                }}
              />
            )}
          </>
        }
        titleTypographyProps={{
          variant: 'h4',
        }}
        action={
          vertical ? null : (
            <Hidden xsDown>
              <ButtonGroup
                color='primary'
                variant='text'
                className={styles.cardHeaderButton}
              >
                <Button onClick={(e) => handleLinks('comparison')}>
                  Comparativo por operadores
                </Button>
                <Button onClick={(e) => handleLinks('list')}>
                  Lista de Operadores
                </Button>
              </ButtonGroup>
            </Hidden>
          )
        }
      />
      <Box className={styles.headerDivision} />
      <CardContent
        className={`${styles.content} ${vertical && styles.verticalContent}`}
      >
        {/* Valores recuperados */}
        <RecoveredValuePanel values={values} goals={goals} />
        {/* Gráficos */}
        <Box
          className={`${styles.charts} ${vertical && styles.verticalCharts}`}
        >
          <span className='divisor' />

          <Chart
            data={[
              {
                label: vertical ? 'Acionam.' : 'Acionamentos',
                color: '#1A75BA',
                value: values.actuation,
                maxValue: goals.standard.actuation,
                type: 'number',
              },
              {
                label: vertical ? 'AP' : 'Acion. Positivo',
                color: '#14A0C1',
                value: values.positiveActuation,
                maxValue: goals.standard.positiveActuation,
                type: 'number',
              },
            ]}
          />
          <span className='divisor' />
          <PolarChart values={values} goals={goals} />
        </Box>
        {/* Dados de desempenho */}
        <Hidden smDown>
          <PerformanceDataPanel values={values} goals={goals} />
        </Hidden>
        <Hidden smUp>
          <Box className={styles.cardEndButton}>
            <div className='gradient' />
            <Button onClick={(e) => handleLinks('comparison')}>
              Comparativo por operadores
            </Button>
            <div className='divisor' />
            <Button onClick={(e) => handleLinks('list')}>
              Lista de Operadores
            </Button>
          </Box>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3px',
              borderTop: '1px solid #DBE5ED',
            }}
          >
            <SendMessageButton
              onClick={() => {
                api
                  .getOperatorsIds(COD_GROUP)
                  .then((operatorsId) => {
                    selectGroupChat({
                      groupName,
                      operatorsId,
                    });
                  })
                  .then(() => {
                    setShowChat(true);
                  });
              }}
            />
          </Box>
        </Hidden>
      </CardContent>
    </Card>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ selectGroupChat, setShowChat }, dispatch);

export default connect(null, mapDispatchToProps)(GroupItem);
