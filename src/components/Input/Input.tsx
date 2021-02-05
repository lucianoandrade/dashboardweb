import React from 'react';

import { FormControl, TextField, Box, makeStyles } from '@material-ui/core';

export interface InputProps {
  displayText: string;
  placeholder: string;
  type: string;
  error?: boolean;
  helperText?: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  inputRoot: {
    background: '#FFFFFF',
    border: '1px solid #CED4DA',
    boxSizing: 'border-box',
    borderRadius: '2px',
    height: '40px',
    padding: '10px 16px',
  },
  error: {
    border: '1px solid red',
  },
  input: {
    padding: '0px',
  },
  inputLabelShrink: {
    fontFamily: 'Source Sans Pro',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '18px',
    color: '#1A2C3B',
    transform: 'translate(0, -8px)',
    '&::after': {
      content: '":"',
    },
    [theme.breakpoints.down('sm')]: {
      color: 'white',
    },
  },
}));

const Input: React.FC<InputProps> = (props: InputProps) => {
  const { displayText, type, placeholder, error, helperText, onChange } = props;
  const styles = useStyles();
  return (
    <Box mt={3} mb={3}>
      <FormControl
        fullWidth
        classes={{
          root: styles.root,
        }}
      >
        <TextField
          label={displayText}
          placeholder={placeholder}
          type={type}
          onChange={(e) => onChange(e.target.value)}
          error={error}
          helperText={helperText}
          InputLabelProps={{
            shrink: true,
            classes: {
              shrink: styles.inputLabelShrink,
            },
          }}
          InputProps={{
            disableUnderline: true,
            classes: {
              root: `${styles.inputRoot} ${error ? styles.error : ''}`,
              input: styles.input,
            },
          }}
        />
      </FormControl>
    </Box>
  );
};

export default Input;
