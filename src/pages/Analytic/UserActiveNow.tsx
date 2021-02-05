import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Bar from '../../components/charts/Bar';
import { activeUsersNow } from '../../store/ducks/analytic/actions';

interface IUserActiveNow {
  data: Array<AnalyticGQL.IDashboardAtivos>;
}

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    marginLeft: 20,
    width: 285,
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    width: '100%',
  },
}));

const CardSection = styled('div')(({ theme }) => ({
  border: '1px solid #DBE5ED',
  boxSizing: 'border-box',
  boxShadow: '0px 0px 4px #FFFFFF, 0px 0px 8px rgba(0, 0, 0, 0.12)',
  background: theme.palette.primary.main,
  borderRadius: 4,
  marginBottom: 20,
}));

const Detail = styled('div')(() => ({
  padding: '13px 20px',
  borderTop: '1px solid #3E88C0',
  display: 'flex',
  justifyContent: 'flex-end',
  fontSize: 12,
  fontWeight: 400,
  color: '#DBE5ED',
}));

const ElementClick = styled('div')(() => ({
  cursor: 'pointer',
}));

const Number = styled('h2')(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: 36,
  fontWeight: 'bold',
  marginBottom: 24,
}));

const Table = styled('div')(() => ({
  color: '#DBE5ED',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  fontSize: 12,
  fontWeight: 'normal',
  height: 190,
}));

const TableRow = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '6px 0 8px 0',
  borderTop: '1px solid #3E88C0',
  [theme.breakpoints.up('sm')]: {
    width: 241,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const TableCell = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '6px 0 8px 0',
  [theme.breakpoints.up('sm')]: {
    width: 241,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const Title = withStyles({
  root: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
})(Typography);

const UserActiveNow: React.FC = () => {
  const { data } = useSelector<SRCWEB.ApplicationState, IUserActiveNow>(
    (state) => ({ data: state.analytic.activeUsersNow })
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(activeUsersNow.request());
  }, [dispatch]);
  return (
    <Container>
      <CardSection>
        <div style={{ padding: 20 }}>
          <Title>Usuários ativos agora</Title>
          <Number>
            {data.map(
              (e) =>
                e.indicador === 'SessoesAtivas' && e.values.map((f) => f.valor)
            )}
          </Number>
          <Bar legend='Exibições de página por minuto' data={data} />
          <Table>
            <TableCell>
              <div>Principais páginas ativas</div>
              <div>Usuários ativos</div>
            </TableCell>
            {data.map(
              (item) =>
                item.indicador === 'top5Pages' &&
                item.values.length > 0 &&
                item.values.map((action, i) => (
                  <TableRow key={`${action.acao}${action.valor}`}>
                    <div>{action.acao}</div>
                    <div>{action.valor}</div>
                  </TableRow>
                ))
            )}
          </Table>
        </div>
        <Detail>
          <ElementClick>
            <Link
              to='/ativosagora'
              style={{ textDecoration: 'none', color: '#FFF' }}
            >
              <div style={{ display: 'flex', fontSize: 12 }}>
                Mais detalhes
                <FontAwesomeIcon
                  style={{ marginLeft: 8, height: 14, width: 8, paddingTop: 1 }}
                  icon={faChevronRight}
                />
              </div>
            </Link>
          </ElementClick>
        </Detail>
      </CardSection>
    </Container>
  );
};

export default UserActiveNow;
