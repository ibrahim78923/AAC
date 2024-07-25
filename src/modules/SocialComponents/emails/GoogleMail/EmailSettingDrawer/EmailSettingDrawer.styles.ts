import { Theme } from '@mui/material';

export const styles = {
  emailArray: (theme: Theme) => ({
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    mb: '24px',
    border: `1px solid ${theme?.palette?.grey[700]}`,
    p: '16px',
  }),

  emailWrap: (theme: Theme) => ({
    background: theme?.palette?.grey[100],
    width: '100%',
    padding: '12px 16px',
  }),

  emailBoxWrap: (theme: Theme) => ({
    borderRadius: '8px',
    border: `1px solid ${theme?.palette?.grey[700]}`,
    width: '100%',
    marginTop: 2,
    padding: 1.2,
  }),

  previewWrap: (theme: Theme) => ({
    fontSize: '14px',
    fontWeight: 400,
    color: theme?.palette?.grey[1000],
    paddingTop: 0.5,
  }),

  sendEmail: (theme: Theme) => ({
    backgroundColor: theme?.palette?.grey[100],
    padding: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    mt: 1.5,
  }),
};
