import { useTheme } from '@mui/material/styles';
export const styles = () => {
  const { palette }: any = useTheme();
  return {
    flexBetween: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemsWrapper: {
      minWidth: { xs: 1200, md: 1100, lg: 1000 },
    },
    headItemWrapper: {
      background: palette?.custom?.off_white_three,
      py: 1.3,
      borderRadius: '8px 8px 0 0 ',
    },
    headItem: {
      fontWeight: 900,
      fontSize: 12,
      lineHeight: '1.5rem',
      textTransform: 'capitalize',
      pl: '1rem',
    },
  };
};
