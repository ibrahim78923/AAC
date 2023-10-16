import { useTheme } from '@mui/material/styles';

export const styles = () => {
  const { palette }: any = useTheme();
  return {
    flexBetween: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tableWrapperStyle: {
      boxShadow: `0px 1px 3px 0px ${palette?.custom?.transparent_dark_blue}`,
      border: `1px solid ${palette?.custom?.off_white}`,
      borderRadius: 2,
      pb: 2.4,
    },
  };
};
