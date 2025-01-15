import { Theme } from '@mui/material';

export const styles = {
  individual: () => ({
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    '& + &': {
      borderTop: '1px solid rgba(0,0,0,0.23)',
    },
  }),
  signees: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: '1',
  },
  signeeName: {
    fontSize: '14px',
  },
  signatureValue: (theme: Theme) => ({
    color: theme?.palette?.secondary?.main,
    fontSize: '13px',
    fontWeight: '600',
    backgroundColor: theme?.palette?.custom?.light_grayish_blue,
    padding: '6px 10px',
    borderRadius: '4px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  fieldActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
};
