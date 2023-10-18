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
      border: '1px solid rgba(98, 110, 142, 0.12)',
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
    itemsWrapper: {
      minWidth: { xs: 1200, md: 1100, lg: 1000 },
    },
    headItemWrapper: {
      background: palette?.custom?.off_white_three,
      py: 1.3,
      borderRadius: '8px 8px 0 0 ',
    },
    headItem: {
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '18px',
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
  };
};
