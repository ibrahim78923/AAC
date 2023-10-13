export const styles = {
  planCard: (theme: any) => ({
    border: `1px solid ${theme.palette.grey[700]}`,
    borderRadius: `20px 4px 20px 4px`,
  }),
  planStatus: {
    display: `flex`,
    justifyContent: `flex-end`,
    padding: `20px 20px 9px 20px`,
    minHeight: '57px',
  },
  planActiveChip: {
    fontSize: `14px`,
    lineHeight: `1.42857`,
    color: `success.main`,
    backgroundColor: `success.lighter`,
    padding: `4px 12px`,
    borderRadius: `16px`,
  },
  planIcon: {
    borderRadius: `50%`,
    height: `51px`,
    width: `51px`,
    backgroundColor: `primary.lighter`,
    margin: `0 auto`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  planTitle: {
    textAlign: 'center',
    fontWeight: '600',
    color: 'slateBlue.main',
    mt: '4px',
  },
  planPlan: {
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '1.5',
    color: 'slateBlue.main',
    textAlign: 'center',
    mt: '4px',
    pb: '16px',
  },
  planPlanLight: (theme: any) => ({
    color: theme.palette.grey[900],
  }),
  planStrip: {
    backgroundColor: `primary.lighter`,
    p: `9px`,
    textAlign: `center`,
  },
  planPrice: {
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: '1.5',
  },
  planBillOn: (theme: any) => ({
    color: theme.palette.custom.main,
    lineHeight: '1.42857',
  }),
  planType: (theme: any) => ({
    fontSize: '16px',
    lineHeight: '1.5',
    fontWeight: '500',
    color: theme.palette.grey[800],
    textAlign: 'center',
    mt: '10px',
  }),
  planActions: {
    p: '24px 20px',
    justifyContent: 'center',
  },
  buttonOutlineGrey: (theme: any) => ({
    borderColor: theme.palette.custom.dark,
    color: theme.palette.custom.main,
    '&:hover': {
      backgroundColor: theme.palette.grey[400],
      borderColor: theme.palette.grey[400],
    },
  }),
};
