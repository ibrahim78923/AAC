import { Theme } from '@mui/material';

export const styles = {
  countDownContainer: {
    display: 'flex',
  },
  freeTrialCountDown: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme?.palette?.custom?.errorLighter,
    borderRadius: '10px',
    padding: '8px',
    color: theme?.palette?.custom?.errorTextColor,
    gap: '10px',
  }),
  freeTrialCountDownTitle: (theme: Theme) => ({
    fontSize: '13px',
    fontWeight: 700,
    maxWidth: '75px',
    lineHeight: '1.2',
    textAlign: 'right',
    color: theme?.palette?.custom?.errorTextColor,
  }),
  freeTrialCountDownTimer: {
    display: 'flex',
    gap: '5px',
  },
  timeBox: (theme: Theme) => ({
    backgroundColor: theme?.palette?.error?.main,
    color: 'primary.contrastText',
    lineHeight: '1',
    fontSize: '20px',
    textAlign: 'center',
    borderRadius: '6px',
    height: '44px',
    width: '44px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }),
  timeTitle: {
    fontSize: '11px',
    fontWeight: '700',
    lineHeight: '1.2',
    textTransform: 'uppercase',
  },
};
