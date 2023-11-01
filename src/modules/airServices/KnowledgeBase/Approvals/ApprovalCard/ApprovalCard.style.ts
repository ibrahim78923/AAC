import { useTheme } from '@mui/material/styles';

export const styles = () => {
  const { palette } = useTheme();
  return {
    cardWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      textTransform: 'capitalize',
      p: 1.6,
      boxShadow: `0px 2px 4px -2px ${palette?.custom?.transparent_dark_blue}, 0px 4px 8px -2px ${palette?.custom?.transparent_dark_blue}`,
      borderRadius: 4,
      gap: 1.2,
    },
    label: {
      color: 'custom.main',
      fontSize: 12,
      fontWeight: 600,
    },
    approvalStatusBtn: {
      height: '2rem',
      backgroundColor: 'blue.main',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '1rem',
      fontWeight: 500,
      cursor: 'pointer',
    },
  };
};
