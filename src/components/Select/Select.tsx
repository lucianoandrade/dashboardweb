import React from 'react';

import {
  LinearProgress,
  FormControl,
  MenuItem,
  Box,
  TextField,
  makeStyles,
} from '@material-ui/core';

export interface SelectOption {
  display: string;
  value: string | number;
}

export interface SelectProps {
  displayText: string;
  placeholder: string;
  loading: boolean;
  value: string | number;
  error?: boolean;
  helperText?: string;
  set: React.Dispatch<React.SetStateAction<string>>;
  options: SelectOption[];
}

const useStyles = makeStyles((theme) => ({
  root: {},
  selectRoot: {
    background: '#FFFFFF',
    border: '1px solid #CED4DA',
    boxSizing: 'border-box',
    borderRadius: '2px',
    height: '40px',
  },
  error: {
    border: '1px solid red',
  },
  select: {
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
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

const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const {
    loading,
    options,
    value,
    placeholder,
    error,
    helperText,
    displayText,
  } = props;
  const styles = useStyles();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.set(event.target.value as string);
  };
  return (
    <Box mt={3} mb={3}>
      {loading ? <LinearProgress /> : <></>}
      {!loading && options.length > 0 ? (
        <FormControl fullWidth>
          <TextField
            select
            label={displayText}
            onChange={handleChange}
            value={value}
            error={error}
            helperText={helperText}
            InputLabelProps={{
              shrink: true,
              classes: {
                shrink: styles.inputLabelShrink,
              },
            }}
            SelectProps={{
              displayEmpty: true,
              disableUnderline: true,
              classes: {
                root: `${styles.selectRoot} ${error ? styles.error : ''}`,
                select: styles.select,
              },
            }}
          >
            <MenuItem value='' disabled>
              {placeholder}
            </MenuItem>
            {options.map((sloption) => (
              <MenuItem key={`opt=${sloption.value}`} value={sloption.value}>
                {sloption.display}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Select;
