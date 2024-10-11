import { Theme } from '@mui/material';

export const styles = {
  staticCardStyle: (theme: Theme) => {
    return {
      border: `1px solid ${theme?.palette?.grey[700]}`,
      borderRadius: '8px',
      padding: '1rem',
    };
  },
};
