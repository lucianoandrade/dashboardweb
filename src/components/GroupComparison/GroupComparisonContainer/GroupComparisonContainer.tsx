import React from 'react';
import {
  makeStyles,
  useTheme,
  useMediaQuery,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import GroupComparisonItem from '../GroupComparisonItem';

const useStyles = makeStyles((theme) => ({
  container: {
    background: '#FFFFFF',
    border: '1px solid #DBE5ED',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.12), 0px 0px 4px #FFFFFF',
    borderRadius: '4px',
  },
  header: {
    borderBottom: '1px solid white',
    boxSizing: 'border-box',
    borderRadius: '4px 4px 0px 0px',
    '& h4': {
      margin: '20px',
      marginBottom: '9px',
    },
  },
  divisor: {
    background:
      'linear-gradient(180deg, rgba(219, 229, 237, 0) 0%, rgba(219, 229, 237, 0.4) 100%)',
    width: 'inherit',
    height: '11px',
  },
  table: {
    padding: '20px',
  },
  dataHeader: {
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontFamily: 'Source Sans Pro',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '18px',
    color: '#1A2C3B',
  },
}));

const TableColumns: Array<{ displayText: string; key: GroupSort }> = [
  {
    displayText: 'Acionamento Total / Meta',
    key: 'actuation',
  },
  {
    displayText: 'Acionamento Positivo / Meta',
    key: 'positiveActuation',
  },
  {
    displayText: 'Qtd. de Promessas / Meta',
    key: 'promises',
  },
  {
    displayText: 'Valor de Promessas / Meta',
    key: 'promisesValue',
  },
];

interface GroupComparisonContainerProps {
  groups: Array<GroupComparison.GroupData>;
  groupSortBy: {
    key: GroupSort;
    reverse: boolean;
  };
  setGroupSortBy: React.Dispatch<
    React.SetStateAction<{
      key: GroupSort;
      reverse: boolean;
    }>
  >;
}

const GroupComparisonContainer: React.FC<GroupComparisonContainerProps> = (
  props: GroupComparisonContainerProps
) => {
  const { groups, groupSortBy, setGroupSortBy } = props;
  const theme = useTheme();
  const styles = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  return mobile ? (
    <>
      {groups.map((group) => (
        <GroupComparisonItem key={`groupItem - ${group.name}`} {...group} />
      ))}
    </>
  ) : (
    <TableContainer classes={{ root: styles.container }} component={Paper}>
      <Box className={styles.header}>
        <Box>
          <Typography variant='h4'>Detalhamento</Typography>
        </Box>
        <Box className={styles.divisor} />
      </Box>
      <Box className={styles.table}>
        <Table aria-label='tabela de comparação de desempenho'>
          <TableHead>
            <TableRow style={{ backgroundColor: 'white' }}>
              <TableCell>
                <Typography classes={{ root: styles.headerText }}>
                  Grupo
                </Typography>
              </TableCell>
              {TableColumns.map(({ key, displayText }) => (
                <TableCell align='center' key={`${key} - ${displayText}`}>
                  <button
                    type='button'
                    style={{ background: 'transparent', outline: 'none' }}
                    onClick={() => {
                      setGroupSortBy((state) => ({
                        key,
                        reverse: key === state.key ? !state.reverse : false,
                      }));
                    }}
                  >
                    {groupSortBy.key === key ? (
                      <>
                        {displayText}
                        <FontAwesomeIcon
                          icon={groupSortBy.reverse ? faSortUp : faSortDown}
                          style={{ marginLeft: '8px' }}
                        />
                      </>
                    ) : (
                      <>
                        {displayText}
                        <FontAwesomeIcon
                          icon={faSort}
                          style={{ marginLeft: '8px' }}
                        />
                      </>
                    )}
                  </button>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <GroupComparisonItem
                key={`groupItem - ${group.name}`}
                {...group}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
};

export default GroupComparisonContainer;
