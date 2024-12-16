import { Theme } from '@mui/material';

export const styles = {
  signeePanel: {
    padding: '18px 0',
  },
  signeesList: {
    pt: '22px',
  },
  signeeDetails: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 18px',
    borderBottom: `1px solid ${theme?.palette?.divider}`,
  }),
  signeeAvatar: (theme: Theme) => ({
    width: '40px',
    height: '40px',
    backgroundColor: theme?.palette?.primary?.main,
    fontSize: '14px',
  }),
  signeeInfo: {
    flex: '1',
  },
  signeeName: (theme: Theme) => ({
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.25',
    color: theme?.palette?.slateBlue?.main,
  }),
  signeeMeta: (theme: Theme) => ({
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '1.25',
    color: theme?.palette?.custom?.light,
  }),

  signingOrder: {
    display: 'flex',
    alignItems: 'center',
    mt: '26px',
  },

  signingOrderTitle: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '1.25',
    flex: '1',
  },
};
