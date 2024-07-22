import { useTheme } from '@mui/material';

export const styles = {
  control: () => {
    const theme = useTheme();
    return {
      borderRadius: '8px',
      border: `1px solid ${theme?.palette?.grey[700]}`,
      marginTop: '25px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px',
    };
  },
};
