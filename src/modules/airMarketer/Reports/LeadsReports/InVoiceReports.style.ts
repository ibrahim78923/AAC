import type { Theme } from '@mui/material';

export const styles = {
  statusButton: (theme: Theme) => ({
    padding: '4px 12px',
    backgroundColor: theme?.palette?.grey[400],
    color: theme?.palette?.custom?.pale_blue_light,
    width: 'fit-content',
    borderRadius: '16px',
  }),
};
