import { ThemeOptions, createMuiTheme } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

interface ICommon {
  black: string;
  white: string;
  darkWhite: string;
  gray: string;
  darkBlue: string;
  aqua: string;
  green: string;
  lightGray: string;
  borderColor: string;
  validationGreen: string;
  validationRed: string;
}
export interface PaletteWithCommon extends PaletteOptions {
  common: ICommon;
}
interface CustomThemeOptions extends ThemeOptions {
  palette: PaletteWithCommon;
}

const theme: CustomThemeOptions = {
  palette: {
    primary: {
      main: '#1A75BA',
    },
    secondary: {
      main: '#2B2B2B',
    },
    common: {
      black: '#1F191A',
      white: '#fff',
      darkWhite: '#f8f8f8',
      gray: '#57585B',
      darkBlue: '#1A2C3B',
      aqua: '#14A0C1',
      green: '#02CC9C',
      lightGray: '#A0AAB5',
      borderColor: '#DBE5ED',
      validationGreen: '#4CBE22',
      validationRed: '#C73228',
    },
  },
  typography: {
    htmlFontSize: 14,
    fontWeightRegular: 'normal',
    fontWeightMedium: 600,
    fontWeightBold: 'bold',
    h1: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '40px',
      lineHeight: '50px',
    },
    h2: {
      fontFamily: 'Source Sans Pro',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '32px',
      lineHeight: '40px',
    },
    h3: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '26px',
      lineHeight: '33px',
    },
    h4: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '25px',
    },
    body1: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '15px',
      lineHeight: '150%',
    },
    body2: {
      fontFamily: 'Source Sans Pro',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '18px',
    },
    button: {
      textTransform: 'capitalize',
    },
  },
  overrides: {
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'white',
          borderRadius: '2px',
        },
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: '14px',
      },
    },
    MuiTable: {
      root: {
        whiteSpace: 'nowrap',
      },
    },
    MuiTableRow: {
      root: {
        padding: '18px 16px',
        '&:nth-child(odd)': {
          background: '#F8F8F8',
        },
      },
    },
    MuiTableCell: {
      root: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#1F191A',
      },
    },
    MuiAvatar: {
      colorDefault: {
        backgroundColor: 'white',
      },
    },
  },
};

export default createMuiTheme(theme);
