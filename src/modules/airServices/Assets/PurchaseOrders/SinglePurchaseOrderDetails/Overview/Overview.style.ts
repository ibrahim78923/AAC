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
    itemsWrapper: {
      minWidth: { xs: 1200, md: 1100, lg: 1000 },
    },
    headItemWrapper: {
      background: palette?.custom?.off_white_three,
      py: 1.3,
      borderRadius: '0.5rem 0.5rem 0 0',
    },
    headItem: {
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '1.125rem',
      textTransform: 'capitalize',
      pl: 1.6,
    },
    billingWrapper: {
      justifyContent: { xs: 'space-between', lg: 'flex-end' },
      columnGap: { xs: 0, lg: 4.4 },
      pb: 1.2,
    },
    billingLabel: {
      width: { xs: 'auto', lg: 120 },
      textAlign: 'right',
      fontSize: 12,
      textTransform: 'capitalize',
    },
    billingValue: { width: 80, fontSize: 12, fontWeight: 600, pt: 1 },
    mainContainerBox: {
      backgroundColor: palette.primary.light,
      width: '100%',
      borderRadius: '0.375rem',
    },
    chlidContainerBox: {
      display: 'flex',
      alignItems: 'center',
      padding: '1.25rem',
    },
    modelSizing: {
      '& .MuiDialog-container': {
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: '1309px',
        },
      },
    },
    logoBox: {
      padding: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
    },
    logoHeading: {
      fontSize: '0.625rem',
      fontWeight: 800,
      color: palette.primary.main,
    },
    iconsStyle: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: '0.625rem',
      marginRight: '1.25rem',
    },
    textColorCommon: { color: palette?.blue?.lighter, mb: '0.3125rem' },
    textColorCommontwo: {
      color: palette?.slateBlue?.main,
      mb: '0.3125rem',
      fontWeight: '600',
    },
    logoImage: { width: '3.25rem', height: 'auto' },
    textBoxStyle: {
      p: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
    },
  };
};
