import { RenderLabelColorsI } from './UserList.interface';

export const styles = {
  customWrapper: () => ({
    position: 'relative',
    borderLeft: `2px solid #D2D6DF`,
  }),
  wrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: { sm: '40px', xs: '20px' },
  },
  leftSide: (theme: any) => ({
    paddingLeft: '12px',
    position: 'relative',
    '&::before': {
      position: 'absolute',
      content: "''",
      left: '-10px',
      top: '30px',
      height: '20px',
      width: '20px',
      borderRadius: '50px',
      border: `1px solid ${theme.palette.grey[700]}`,
      background: '#fff',
      zIndex: 1,
    },
    '&::after': {
      position: 'absolute',
      content: "''",
      left: '0px',
      top: '38px',
      height: '2px',
      width: '100%',
      border: `2px dashed ${theme.palette.grey[400]}`,
    },
  }),
  leftText: {
    mt: '10px',
    mb: '4px',
    color: '#D1D5DB',
  },
  rightSide: (theme: any) => ({
    mb: '24px',
    flex: 1,
    border: `1px solid ${theme.palette.grey[700]}`,
    borderRadius: '6px',
    padding: '9px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '15px',
  }),
  msg: {
    color: '#38CAB5',
    pl: '3px',
  },
  label: (theme: any) => ({
    borderRadius: '16px',
    padding: '2px 12px',
    background: theme.palette.custom.bright,
    ml: 'auto',
    textTransform: 'capitalize',
  }),
  avatar: {
    fontSize: '14px',
    textTransform: 'uppercase',
  },
};

export const renderLabelColors: RenderLabelColorsI = {
  added: { background: '#0AADC733', color: '#0AADC7' },
  failed: { background: '#FF4A4A33', color: '#FF4A4A' },
  updated: { background: '#47B26333', color: '#47B263' },
};
