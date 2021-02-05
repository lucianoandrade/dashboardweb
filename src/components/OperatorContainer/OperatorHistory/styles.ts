import { makeStyles } from '@material-ui/core';

export const colorArray = [
  '#14A0C1',
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '241px auto',
    gridTemplateAreas: '"resumo conteudo"',
    gridGap: '24px',
    marginBottom: '24px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateAreas: '"conteudo"',
      gridTemplateColumns: '1fr',
    },
  },
  box: {
    background: '#FFFFFF',
    border: '1px solid #DBE5ED',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.12), 0px 0px 4px #FFFFFF',
    borderRadius: '4px',
  },
  group: {
    gridArea: 'resumo',
  },
  main: {
    gridArea: 'conteudo',
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
  overflowX: {
    overflowX: 'scroll',
    maxWidth: '925px',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
      borderRadius: '4px',
      background: '#E8EAED',
      boxShadow: 'inset 1px 1px 1px rgba(0, 0, 0, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#A0AAB5',
      borderRadius: '4px',
    },
  },
  tableHead: {
    backgroundColor: 'white !important',
  },
  tableHeadCell: {
    display: 'flex',
    alignItems: 'center',
    ...Object.fromEntries(
      colorArray.map((color, i) => [`& .checkedColor${i}`, { color }])
    ),
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
  boxMobile: {
    height: '564px',
  },
}));

export default useStyles;
