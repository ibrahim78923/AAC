import { Theme } from '@mui/material';

export const styles = {
  iconWrap: { display: 'flex', gap: '5px', alignItems: 'center' },

  accordianText: (theme: Theme) => {
    return {
      color: theme?.palette?.slateBlue['main'],
      fontSize: '14px',
      fontWeight: 600,
    };
  },
  accordianEmail: (theme: Theme) => {
    return {
      color: theme?.palette?.grey['900'],
      fontSize: '14px',
      fontWeight: '600',
    };
  },
  heading: { display: 'flex', justifyContent: 'space-between', my: '15px' },
  accordianSummary: (theme: Theme) => {
    return {
      background: theme?.palette?.secondary['main'],
      height: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '24px',
      borderRadius: '4px',
      color: theme?.palette?.grey[400],
    };
  },
};
