import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  box: {
    background: '#FFFFFF',
    border: '1px solid #DBE5ED',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.12), 0px 0px 4px #FFFFFF',
    borderRadius: '4px',
  },
  commomHeader: {
    height: '57px',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&::after': {
      content: '""',
      height: '11px',
      position: 'absolute',
      left: '0px',
      right: '0px',
      bottom: '0px',
      background:
        'linear-gradient(180deg, rgba(219, 229, 237, 0) 0%, rgba(219, 229, 237, 0.4) 100%)',
    },
  },
  chartHeader: {
    '& > button': {
      alignSelf: 'stretch',
      width: '57px',
      backgroundColor: 'white',
      borderRadius: '4px',
    },
  },
  chart: {
    marginBottom: '24px',
    display: 'grid',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  listHeader: {
    padding: '0px 20px',
  },
  searchBar: {
    background: '#FFFFFF',
    border: '1px solid #CED4DA',
    boxSizing: 'border-box',
    borderRadius: '2px',
    height: '40px',
    width: '224px',
    padding: '15px',
    paddingLeft: '35px',
  },
  searchBarIcon: {
    position: 'relative',
    left: '30px',
    color: '#A0AAB5',
  },
  list: {
    marginBottom: '24px',
  },
  listTable: {
    padding: '20px',
  },
  tableHead: {
    backgroundColor: 'white !important',
  },
  metaDisplay: {
    color: '#A0AAB5',
  },
  itemMobile: {
    marginBottom: '6px',
    '&:last-child': {
      marginBottom: '35px',
    },
  },
  itemData: {
    padding: '20px',
    paddingTop: '16px',
    '& > p': {
      marginBottom: '8px',
    },
  },
  boxMobile: {},
}));

export default useStyles;
