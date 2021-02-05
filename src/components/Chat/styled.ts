import { styled } from '@material-ui/core';

export const Wrapper = styled('div')({
  position: 'fixed',
  right: '21px',
  bottom: '21px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  zIndex: 1110,
});
export const ChatButton = styled('button')(({ theme }) => ({
  position: 'relative',
  height: '62px',
  width: '62px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  fontSize: '1.4em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:focus': {
    outline: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    '&.secondButton': {
      marginBottom: '60px',
    },
  },
}));
export const NewMessageBadge = styled('span')({
  position: 'absolute',
  backgroundColor: '#C73228',
  height: '16px',
  width: '16px',
  borderRadius: '50%',
  top: '0px',
  right: '0px',
});
export const ChatItemContainer = styled('div')({
  flexGrow: 1,
  padding: '0px 20px',
  overflowY: 'auto',
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
});
export const GroupMessageInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#60788C',
  height: '100%',
});

export const ChatInputArea = styled('form')({
  borderTop: '1px solid #DBE5ED',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
});

export const TextArea = styled('input')({
  border: '1px solid #CED4DA',
  borderRadius: '2px',
  marginBottom: '8px',
  padding: '12px',
  height: '60px',
  resize: 'none',
  '&:focus': {
    outline: 'none',
  },
});
export const SendButton = styled('button')({
  height: '40px',
  background: '#1A75BA',
  color: '#FFFFFF',
  '&:focus': {
    outline: 'none',
  },
});
