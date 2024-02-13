export const styles = () => {
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
    headItemWrapper: (theme: any) => {
      return {
        background: theme?.palette?.custom?.off_white_three,
        py: 1.3,
        borderRadius: '8px 8px 0 0 ',
      };
    },
    headItem: {
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '18px',
      textTransform: 'capitalize',
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
