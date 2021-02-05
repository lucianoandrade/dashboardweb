import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

import headerBg from '../../assets/img/pageHeaderBG.png';

export default makeStyles((theme) => ({
  bg: {
    backgroundColor: '#fff',
  },

  header: {
    maxWidth: '100%',
    height: 131,
    background: `url('${headerBg}')`,
    backgroundRepeat: 'repeat-x',
    backgroundPositionX: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '64px 40px 0 40px',
  },

  breadCrumb: {
    background: '#FFFFFF',
    opacity: 0.85,
    borderRadius: '4px',
    padding: '8px 12px',
    '& > *': {
      display: 'inline-block',
      color: '#57585B',
      '&:last-child': {
        color: '#57585B',
        fontWeight: 700,
      },
    },
    '& > svg': {
      margin: '0px 4px',
    },
  },

  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '24px 40px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },

  mainInput: {
    marginLeft: 'auto',
    maxWidth: 280,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      padding: '0 20px',
      marginTop: 24,
    },
  },

  graphPages: {
    display: 'inline-flex',
    maxWidth: 1200,
    width: '100%',
    height: 421,
    border: '1px solid #DBE5ED',
    boxShadow: '0px 0px 4px #FFFFFF, 0px 0px 8px rgba(0, 0, 0, 0.12)',
    boxSizing: 'border-box',
    borderRadius: 4,
    marginTop: 24,
    backgroundColor: '#FFF',
    [theme.breakpoints.down('sm')]: {
      padding: '0 20px',
      overflowY: 'hidden',
      overflowX: 'auto',
      border: 'none',
      boxShadow: 'none',
      borderRadius: 0,
    },
  },

  graphpage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0 40px 5px 0',
  },

  page: {
    marginBottom: 16,
    display: 'flex',
    fontSize: 14,
  },

  viewPage: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 1200,
    width: '100%',
    border: '1px solid #DBE5ED',
    boxShadow: '0px 0px 4px #FFFFFF, 0px 0px 8px rgba(0, 0, 0, 0.12)',
    boxSizing: 'border-box',
    borderRadius: 4,
    marginTop: 24,
    backgroundColor: '#FFF',
    [theme.breakpoints.down('sm')]: {
      border: 'none',
      boxShadow: 'none',
      borderRadius: 0,
    },
  },

  viewPageTitle: {
    display: 'flex',
    alignItems: 'center',
    height: 56,
    marginLeft: 20,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  line: {
    width: '100%',
    height: 10,
    marginTop: -10,
    background:
      'linear-gradient(180deg, rgba(219, 229, 237, 0) 0%, rgba(219, 229, 237, 0.4) 100%)',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  viewPages: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '20px',
    marginBottom: '32px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },

  pagBox1: {
    width: 20,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
    backgroundColor: '#7DE315',
  },

  pagBox2: {
    width: 20,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
    backgroundColor: '#14A0C1',
  },

  pagBox3: {
    width: 20,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
    backgroundColor: '#F1C422',
  },

  pagBox4: {
    width: 20,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
    backgroundColor: '#1A75BA',
  },
}));

export const Bullet = styled.button<{ color: string }>`
  display: inline-block;
  background: ${(props: { color: string }): string => props.color};
  height: 16px;
  width: 16px;
  border-radius: 2px;
  margin-right: 12px;
`;

export const MobileCard = styled.div`
  padding: 18px 20px;
  padding-left: 48px;
  border-bottom: 1px solid #dbe5ed;

  &:nth-child(odd) {
    background: #f8f8f8;
  }
  .square-button {
    margin-left: -28px;
    position: relative;
  }
  .head {
    display: flex;
    align-items: center;
    .link {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 18px;
      color: #1a75ba;
    }
    .quantity {
      margin-left: auto;
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 18px;
      text-align: right;
      color: #1f191a;
    }
  }
  .info {
    display: flex;
    align-items: center;
    margin-top: 8px;
    strong {
      margin-right: 4px;
    }
  }
`;
