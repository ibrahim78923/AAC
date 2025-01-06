import { Theme } from '@mui/material';

export const styles = {
  container: {
    display: 'flex',
  },
  sidebar: (theme: Theme) => ({
    width: '270px',
    backgroundColor: theme?.palette?.primary?.lighter,
    padding: '24px 20px',
    borderRadius: '8px',
  }),
  title: (theme: Theme) => ({
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.25',
    color: theme?.palette?.slateBlue?.main,
  }),
  content: {
    flex: 1,
    padding: '80px 28px 80px 48px',
  },
  contentTitle: (theme: Theme) => ({
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.25',
    color: theme?.palette?.slateBlue?.main,
  }),
  field: {
    mt: '24px',
  },
  resendContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  resendButton: (theme: Theme) => ({
    color: theme?.palette?.primary?.main,
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    ml: 'auto',
  }),
  stepActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '48px',
  },
};
