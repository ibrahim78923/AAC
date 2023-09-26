import { alpha } from '@mui/material/styles';

export function createGradient(color1: string, color2: string) {
  return `linear-gradient(90deg, ${color1} 10.76%, ${color2} 133.7%)`;
}

const PRIMARY = {
  lighter: '#cff2ed',
  light: '#2da291',
  main: '#38CAB5',
  dark: '#16847f',
  darker: '#278d7f',
};
const SECONDARY = {
  lighter: '#727d99',
  light: '#5d6a8a',
  main: '#35456D',
  dark: '#2a3757',
  darker: '#25304c',
};
const SUCCESS = {
  lighter: '#EEF9F1;',
  light: '#AAF27F',
  main: '#47B263',
  dark: '#229A16',
  darker: '#08660D',
};
const WARNING = {
  lighter: '#ffda6e',
  light: '#ffd456',
  main: '#FFC20E',
  dark: '#cc9b0b',
  darker: '#b3880a',
};
const ERROR = {
  lighter: '#ff8080',
  light: '#ff6e6e',
  main: '#FF4A4A',
  dark: '#cc3b3b',
  darker: '#b33434',
};
const BLUE = {
  lighter: '#626e8e',
  light: '#4c597d',
  main: '#1F305D',
  dark: '#19264a',
  darker: '#162241',
};

const GREY: any = {
  0: '#FFFFFF',
  100: '#f9fafb',
  200: '#f8f8fa',
  300: '#f7f7f9',
  400: '#f3f4f6',
  500: '#7a7a7b',
  600: '#929294',
  700: '#aaabac',
  800: '#c2c3c5',
  900: '#6B7280',
  500_8: '#1F2937',
  500_12: '#9CA3AF',
  500_16: '#E5E7EB',
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  blue: { ...BLUE, contrastText: '#fff' },
  grey: GREY,
  gradients: GRADIENTS,

  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: '#fff', default: GREY[200], neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    text: { primary: '#fff', secondary: GREY[500], disabled: GREY[600] },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: GREY[500_16],
    },
    action: { active: GREY[500], ...COMMON.action },
  },
};

export default palette;
