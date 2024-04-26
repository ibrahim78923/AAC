export const styles = {
  // this style use on multiple places
  flexBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemsWrapper: {
    minWidth: {
      xs: 1200,
      md: 1100,
    },
  },
  headItemWrapper: (theme: any) => ({
    background: theme?.palette?.custom?.off_white_three,
    py: 1.3,
    borderRadius: '0.5rem 0.5rem 0 0',
  }),
  headItem: {
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '1.125rem',
    textTransform: 'capitalize',
    pl: 1.6,
  },
  billingWrapper: {
    justifyContent: {
      xs: 'space-between',
      lg: 'flex-end',
    },
    columnGap: {
      xs: 0,
      lg: 4.4,
    },
    pb: 1.2,
  },
  billingLabel: {
    width: {
      xs: 'auto',
      lg: 120,
    },
    textAlign: 'right',
    fontSize: 12,
    textTransform: 'capitalize',
    marginTop: 1,
  },
  billingValue: {
    width: 80,
    fontSize: 12,
    fontWeight: 600,
    pt: 1,
  },
};
