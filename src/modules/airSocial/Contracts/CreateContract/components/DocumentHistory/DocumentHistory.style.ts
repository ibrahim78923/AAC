import { Theme } from '@mui/material';

export const styles = {
  container: (theme: Theme) => ({
    backgroundColor: theme?.palette?.custom?.pale_grayish_blue,
    border: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
    padding: '24px',
    borderRadius: '4px',
  }),
  title: () => ({
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '1.25',
    color: 'secondary.main',
    mb: '10px',
  }),
  document: () => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 0',
  }),
  icon: {
    height: '30px',
    width: '30px',
  },
  documentInfo: {
    flex: '1',
  },
  docTitle: {
    fontSize: '12px',
    color: 'secondary.main',
    lineHeight: '1.25',
  },
  docDesc: (theme: Theme) => ({
    fontSize: '11px',
    color: theme?.palette?.custom?.light,
    lineHeight: '1.25',
    mt: '5px',
  }),
};
