import { useTheme } from '@mui/material/styles';
export const styles = () => {
  const { palette }: any = useTheme();
  return {
    mainWrapper: {
      borderRadius: '12px',
      border: `1px solid ${palette?.custom?.off_white}`,
      boxShadow: `0px 1px 3px 0px ${palette?.custom?.transparent_dark_blue}`,
      padding: 2.4,
      height: 720,
      overflow: 'scroll',
    },
    mainHeading: {
      color: palette?.slateBlue?.main,
      fontSize: '1.25rem',
      lineheight: '1.875rem',
      fontweight: 600,
      pb: '1.75rem',
    },
    subHeading: {
      color: palette?.custom?.main,
      fontWeight: 600,
      fontSize: 20,
      lineHeight: '30px',
      pb: 2.4,
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      m: '1.875rem 1.875rem 0 0',
    },
  };
};
