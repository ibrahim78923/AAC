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
    mainWrapper: {
      borderRadius: '12px',
      border: `1px solid ${palette?.custom?.off_white}`,
      boxShadow: `0px 1px 3px 0px ${palette?.custom?.transparent_dark_blue}`,
      padding: 2.4,
      height: 780,
      overflow: 'scroll',
    },
    mainHeading: {
      color: palette?.slateBlue?.main,
    },
    subHeading: {
      color: palette?.custom?.main,
      fontWeight: 600,
      fontSize: 20,
      lineHeight: '30px',
      pb: 2.4,
    },
  };
};
