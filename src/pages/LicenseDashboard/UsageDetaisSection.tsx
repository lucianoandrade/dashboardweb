import {
  faCommentAlt,
  faFileExcel,
  faPowerOff,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  styled,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useRef, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ReactComponent as ArrowDownSvg } from '../../assets/img/arrowDown.svg';
import api from '../../services/api';
import {
  createChat,
  selectChat,
  setShowChat,
} from '../../store/ducks/chat/actions';
import ConfirmationModal from './ConfirmationModal';
import './excel.css';
import ExportTable from './ExportTable';

const DetailedSection = styled(Container)(({ theme }) => ({
  marginBottom: '64px',
  transition: '0.2s',
  backgroundColor: '#F6F7F9',
  '&.loading': {
    opacity: 0.3,
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: '12px',
    padding: '0px',
  },
}));
const TitleBar = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '40px',
  position: 'relative',
}));
const ArrowDown = styled(ArrowDownSvg)({
  position: 'absolute',
  top: '-38px',
  margin: '0 auto',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
const Title = styled(Typography)(() => ({
  marginTop: '60px',
}));
const CsvButton = styled(Button)(() => ({
  marginTop: '60px',
  borderRadius: '0px',
  '& svg': {
    marginRight: '8px',
  },
}));
const TableContainer = styled('div')(({ theme }) => ({
  marginTop: '40px',
  background: '#FFFFFF',
  border: '1px solid #DBE5ED',
  boxSizing: 'border-box',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  [theme.breakpoints.down('sm')]: {
    marginTop: '24px',
    boxShadow: 'none',
    border: 'none',
  },
}));
const FilterBar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '20px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));
const SearchInput = styled('input')(({ theme }) => ({
  background: '#FFFFFF',
  border: '1px solid #CED4DA',
  boxSizing: 'border-box',
  borderRadius: '2px',
  height: '40px',
  width: '224px',
  padding: '15px',
  paddingLeft: '35px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginBottom: '20px',
  },
}));
const SearchInputIcon = styled(FontAwesomeIcon)(({ theme }) => ({
  position: 'relative',
  left: '30px',
  color: '#A0AAB5',
  [theme.breakpoints.down('sm')]: {
    position: 'absolute',
    left: '14px',
    top: '14px',
  },
}));
const FilterButtons = styled(ButtonGroup)(() => ({
  '& *': {
    borderRadius: '0px',
  },
}));
const Table = styled(MuiTable)(() => ({}));
const LicenseAction = styled(Button)({
  borderRadius: '0px',
  height: '36px',
  width: '36px',
  minWidth: '36px',
  padding: '0px',
});

const ItemMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: '24px 32px',
  border: '1px solid #DBE5ED',
  boxSizing: 'border-box',
}));
const ItemMobileInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
}));
const AccordionMobile = styled(Accordion)({
  '&::before': { background: 'transparent' },
});

type Props = {
  selectedDate: string;
  mobile: boolean;
  createChat: typeof createChat.success;
  selectChat: typeof selectChat;
  setShowChat: typeof setShowChat;
};

const UsageDetailsSection = ({
  selectedDate,
  mobile,
  createChat,
  selectChat,
  setShowChat,
}: Props): JSX.Element => {
  const [licenseGroups, setLicenseGroups] = useState<
    LicenseAPI.IResponseLicenseDataByDay
  >({});
  const [filter, setFilter] = useState<'all' | 'online'>('all');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    api.getDetailedData(selectedDate).then(({ data }) => {
      setLoading(false);
      setLicenseGroups(data);
    });
  }, [selectedDate]);
  useEffect(() => {
    const updateDetailed = () => {
      api.getDetailedData(selectedDate).then(({ data }) => {
        setLoading(false);
        setLicenseGroups(data);
      });
    };
    const intervalId = setInterval(updateDetailed, 30000);
    return () => clearInterval(intervalId);
  });
  const [idToForceLogout, setIdToForceLogout] = useState(0);
  const handleModalClose = (confirmation: boolean) => {
    if (confirmation) {
      api.forceLogout(idToForceLogout).then(() => {
        setLoading(true);
        api.getDetailedData(selectedDate).then(({ data }) => {
          setLoading(false);
          setLicenseGroups(data);
        });
      });
    }
    setIdToForceLogout(0);
  };
  const handleSendMessage = (id: number, name: string) => {
    createChat({
      messages: [],
      operatorId: id,
      operatorName: name,
      haveNewMessage: true,
    });
    selectChat(id);
    setShowChat(true);
  };
  const [loginFilter, setLoginFilter] = useState('');
  const exportExcel = useRef();
  const handleClickButtonExportTable = () => {
    if (exportExcel.current) {
      ((exportExcel.current as unknown) as {
        handleDownload: () => void;
      }).handleDownload();
    }
  };
  if (!selectedDate) return <></>;
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div style={{ backgroundColor: '#F6F7F9' }}>
      <DetailedSection className={loading ? 'loading' : ''}>
        {mobile || (
          <TitleBar>
            <ArrowDown />
            <Title variant='h2' id='usuarios-em-data'>
              {`Usuários em ${selectedDate}`}
            </Title>
            <CsvButton
              variant='outlined'
              color='primary'
              onClick={handleClickButtonExportTable}
            >
              <ReactHTMLTableToExcel
                table='acessos-xls'
                filename='Acessos'
                sheet='Sheet'
                id='downloadexcel'
                ref={exportExcel}
                className='excel-button'
              />
              <FontAwesomeIcon icon={faFileExcel} />
              Exportar Tabela
            </CsvButton>
          </TitleBar>
        )}
        <TableContainer>
          <FilterBar>
            <div style={{ position: 'relative' }}>
              <SearchInputIcon icon={faSearch} />
              <SearchInput
                type='text'
                placeholder='Buscar Operador...'
                value={loginFilter}
                onChange={(e) => setLoginFilter(e.target.value)}
              />
            </div>
            <FilterButtons fullWidth={mobile}>
              <Button
                variant={filter === 'online' ? 'contained' : 'outlined'}
                color='primary'
                onClick={() => setFilter('online')}
              >
                Usuários Online
              </Button>
              <Button
                variant={filter === 'all' ? 'contained' : 'outlined'}
                color='primary'
                onClick={() => setFilter('all')}
              >
                Ver Todos
              </Button>
            </FilterButtons>
          </FilterBar>
          {mobile ||
            Object.keys(licenseGroups).map((licenseGroup) => {
              const filteredGroups = licenseGroups[licenseGroup]
                .filter((val) => (filter === 'all' ? true : !val.HorarioLogout))
                .filter((val) => {
                  const regex = new RegExp(loginFilter, 'i');
                  return regex.test(val.LoginRecuperador);
                });
              if (filteredGroups.length === 0) {
                return (
                  <AccordionSummary>
                    {`${licenseGroup} sem usuários visíveis`}
                  </AccordionSummary>
                );
              }
              return (
                <Accordion
                  elevation={0}
                  key={licenseGroup}
                  style={{ margin: '0px' }}
                >
                  <AccordionSummary
                    style={{
                      flexDirection: 'row-reverse',
                      backgroundColor: '#F4F7FA',
                    }}
                    expandIcon={
                      <ExpandMoreIcon style={{ margin: '0px 8px' }} />
                    }
                    // classes={classes}
                    aria-controls='panel1a-content'
                  >
                    {licenseGroup}
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      padding: '0px',
                      flexDirection: mobile ? 'column' : 'row',
                    }}
                  >
                    <Table style={{ backgroundColor: 'white' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Login</TableCell>
                          <TableCell align='center'>Horário Inicial</TableCell>
                          <TableCell align='center'>Horário Final</TableCell>
                          <TableCell align='center' />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredGroups.map((group) => (
                          <TableRow key={group.Id}>
                            <TableCell>{group.LoginRecuperador}</TableCell>
                            <TableCell align='center'>
                              {group.HorarioLogin}
                            </TableCell>
                            <TableCell align='center'>
                              {group.HorarioLogout}
                            </TableCell>
                            <TableCell align='right'>
                              {!group.HorarioLogout && (
                                <LicenseAction
                                  variant='contained'
                                  color='inherit'
                                  onClick={() => {
                                    setIdToForceLogout(group.Id);
                                  }}
                                  style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    marginRight: '8px',
                                  }}
                                >
                                  <FontAwesomeIcon icon={faPowerOff} />
                                </LicenseAction>
                              )}
                              <LicenseAction
                                variant='contained'
                                color='primary'
                                onClick={() => {
                                  handleSendMessage(
                                    group.CodigoRecuperador,
                                    group.LoginRecuperador
                                  );
                                }}
                              >
                                <FontAwesomeIcon icon={faCommentAlt} />
                              </LicenseAction>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </TableContainer>
      </DetailedSection>
      <div style={{ marginBottom: '24px' }}>
        {mobile &&
          Object.keys(licenseGroups).map((licenseGroup) => {
            const filteredGroups = licenseGroups[licenseGroup]
              .filter((val) => (filter === 'all' ? true : !val.HorarioLogout))
              .filter((val) => {
                const regex = new RegExp(loginFilter, 'i');
                return regex.test(val.LoginRecuperador);
              });
            if (filteredGroups.length === 0) {
              return (
                <AccordionSummary>
                  {`${licenseGroup} sem usuários visíveis`}
                </AccordionSummary>
              );
            }
            return (
              <AccordionMobile
                elevation={0}
                key={licenseGroup}
                style={{ margin: '0px' }}
              >
                <AccordionSummary
                  style={{
                    flexDirection: 'row-reverse',
                    backgroundColor: '#F4F7FA',
                    border: '1px solid #DBE5ED',
                  }}
                  expandIcon={<ExpandMoreIcon style={{ margin: '0px 8px' }} />}
                  // classes={classes}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  {licenseGroup}
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    padding: '0px',
                    flexDirection: mobile ? 'column' : 'row',
                  }}
                >
                  {filteredGroups.map((group) => (
                    <ItemMobile key={group.Id}>
                      <ItemMobileInfo>
                        <Typography>{group.LoginRecuperador}</Typography>
                        {group.HorarioLogin && (
                          <Typography
                            style={{
                              fontFamily: 'Roboto',
                              fontStyle: 'normal',
                              fontWeight: 400,
                              fontSize: '13px',
                              lineHeight: '15px',
                              display: 'flex',
                              alignItems: 'center',
                              color: '#57585B',
                            }}
                          >
                            <span style={{ fontWeight: 500 }}>
                              {'Horário inicial: '}
                            </span>
                            {group.HorarioLogin}
                          </Typography>
                        )}
                        {group.HorarioLogout && (
                          <Typography
                            style={{
                              fontFamily: 'Roboto',
                              fontStyle: 'normal',
                              fontWeight: 400,
                              fontSize: '13px',
                              lineHeight: '15px',
                              display: 'flex',
                              alignItems: 'center',
                              color: '#57585B',
                            }}
                          >
                            <span style={{ fontWeight: 500 }}>
                              {'Horário final: '}
                            </span>
                            {group.HorarioLogout}
                          </Typography>
                        )}
                      </ItemMobileInfo>
                      {!group.HorarioLogout && (
                        <LicenseAction
                          variant='contained'
                          color='inherit'
                          onClick={() => {
                            setIdToForceLogout(group.Id);
                          }}
                          style={{
                            backgroundColor: 'red',
                            color: 'white',
                            marginRight: '8px',
                          }}
                        >
                          <FontAwesomeIcon icon={faPowerOff} />
                        </LicenseAction>
                      )}
                      <LicenseAction
                        variant='contained'
                        color='primary'
                        onClick={() => {
                          handleSendMessage(
                            group.CodigoRecuperador,
                            group.LoginRecuperador
                          );
                        }}
                      >
                        <FontAwesomeIcon icon={faCommentAlt} />
                      </LicenseAction>
                    </ItemMobile>
                  ))}
                </AccordionDetails>
              </AccordionMobile>
            );
          })}
      </div>
      {licenseGroups && (
        <ExportTable
          selectedDate={selectedDate}
          filteredAccesses={licenseGroups}
        />
      )}
      <ConfirmationModal onClose={handleModalClose} open={!!idToForceLogout} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { createChat: createChat.success, selectChat, setShowChat },
    dispatch
  );

export default connect(null, mapDispatchToProps)(UsageDetailsSection);
