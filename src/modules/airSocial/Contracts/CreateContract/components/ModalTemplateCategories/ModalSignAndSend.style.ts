import { Theme } from '@mui/material';

export const styles = {
  drawSignWrap: (theme: Theme) => ({
    border: `1px solid ${theme?.palette?.primary?.lighter}`,
    padding: '12px',
    borderRadius: '12px',
    mt: '24px',
  }),
  signCanvasCard: (theme: Theme) => ({
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: theme?.palette?.custom?.lighter_slate_blue,
    mb: '16px',
  }),
  signCanvasBody: {
    flex: '1',
    height: '210px',
    position: 'relative',
    padding: '10px',
    boxSizing: 'border-box',
  },
  signCanvasStripe: {
    height: '14px',
    background: `repeating-linear-gradient(-55deg, #38CAB5, #38CAB5 80px, #ffffff 80px, #ffffff 83px)`,
  },
  clearButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
  },
};
