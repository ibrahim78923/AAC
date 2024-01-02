export function createGradient(color1: string, color2: string) {
  return `linear-gradient(90deg, ${color1} 10.76%, ${color2} 133.7%)`;
}

const PRIMARY = {
  lighter: '#EBFAF8',
  light: '#D7F4F0',
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
  lighter: '#E4FFEB;',
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
  dull_blue: '#111827',
};
const SLATE_BLUE = {
  lighter: '#878d97',
  light: '#5f6774',
  main: '#374151',
  dark: '#2c3441',
  darker: '#272e39',
};
const INFO = {
  lighter: '#ceeff5',
  light: '#85d6e7',
  main: '#0aadcf',
  dark: '#3bbdd9',
  darker: '#23b5d4',
};
const GREY: any = {
  0: '#D1D5DB',
  100: '#f9fafb',
  200: '#f8f8fa',
  300: '#f7f7f9',
  400: '#f3f4f6',
  500: '#7a7a7b',
  600: '#4B5563',
  700: '#E5E7EB',
  800: '#1F2937',
  900: '#9CA3AF',
};

const CUSTOM_COLORS = {
  lighter: '#5C5C5C',
  light: '#667085',
  main: '#6B7280',
  dark: '#D1D5DB',
  bluish_gray: '#BCC1CE',
  bright: '#0AADC7',
  transparent_dark_blue: 'rgba(16, 24, 40, 0.1)',
  transparent_bluish_gray: 'rgba(98, 110, 142, 0.12',
  off_white: 'rgba(234, 236, 240, 1)',
  grayish_blue: '#6B7280',
  aqua_breeze: '#A0E5DB80',
  light_green: ' #88DFD3',
  off_white_one: '#E9EAEF',
  off_white_two: '#E6E9F5',
  off_white_three: '#EAECF0',
  mint_green: '#E6FAEB',
  light_lavender_gray: '#EAECF0',
  steel_blue: '#79839E99',
  steel_blue_alpha: '#79839E',
  light_greyish: '#EAEAEA',
  light_grayish_blue: '#E9EAEF',
  shade_grey: '#1018281A',
  turquoise_Blue: '#4CCFBC',
  dark_blue: '#030229',
  pale_grayish_blue: '#F7F9FB',
  dark_shade_green: '#1018280F',
  pale_gray: '#E9E9E9',
  border_grayish_blue: '#e7e7e9',
  dim_grey: '#555656',
  dim_blue: '#6E7191',
  text_slate_blue: '#405893',
  cadet_color: '#A5ACBE',
  dark_grey: '#8F98AE ',
  pale_blue_light: '#AFEAE1',
  hawkes_blue: '#D2D6DF',
  blue_crayola: '#1877F2',
  white_smoke: '#f3f3f3',
  mulled_wine: '#4E4B66',
  silver_chalice: '#ABAFB1',
  white_rock: '#E6E6E6',
  black_pearl: '#14142B',
  error_lighter: 'rgba(255, 74, 74, 0.10)',
  hex_grey: '#e0e0e0',
  white_fifty: '#FAFAFA',
  custom_red: '#FF5F56',
};
const GRAPH = {
  cyan: 'blue',
  Tropical_Rain_Forest: '#0AADC7',
  published: '#ECFDF3',
  published_not_bg: '#FFF6DD',
  published_not_color: '#F2B500',
  Trash_bg: '#D2D6DF',
  slate_gray: '#EDEDED',
};
const GRADIENTS = {
  primary: createGradient(PRIMARY?.light, PRIMARY?.main),
  success: createGradient(SUCCESS?.light, SUCCESS?.main),
  warning: createGradient(WARNING?.light, WARNING?.main),
  error: createGradient(ERROR?.light, ERROR?.main),
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: GREY[800] },
  blue: { ...BLUE, contrastText: GREY[800] },
  info: { ...INFO, contrastText: GREY[800] },
  custom: { ...CUSTOM_COLORS, contrastText: GREY[800] },
  slateBlue: { ...SLATE_BLUE, contrastText: GREY[800] },
  graph: { ...GRAPH, contrastText: '#fff' },
  grey: GREY,
  gradients: GRADIENTS,

  divider: GREY[400],
  action: {
    hover: GREY[400],
    selected: GREY[400],
    disabled: GREY[400],
    disabledBackground: GREY[400],
    focus: GREY[400],
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
declare module '@mui/material/styles' {
  interface Palette {
    custom: any;
    blue: any;
    slateBlue: any;
    graph?: any;
  }

  interface PaletteOptions {
    custom?: any;
    blue?: any;
    slateBlue?: any;
    graph?: any;
  }
}
