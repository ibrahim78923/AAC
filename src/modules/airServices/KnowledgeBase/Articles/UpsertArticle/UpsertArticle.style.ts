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
    },
    mainHeading: {
      color: palette?.slateBlue?.main,
    },
    formGridWrapper: {
      borderLeft: `1px solid ${palette?.custom?.dark}`,
      position: 'relative',
      padding: 2.4,
    },

    formBtnWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 2,
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
  };
};
