import { Theme } from '@mui/material';

export const styles = {
  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  label: (theme: Theme) => ({
    flex: '1',
    color: theme?.palette?.grey[600],
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '1.57142857',
  }),
  fieldGroup: () => ({
    border: `1px solid rgba(0,0,0,0.23)`,
    borderRadius: '4px',
    padding: '0 12px',
  }),
};
