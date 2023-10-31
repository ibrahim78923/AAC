export const styles = {
  container: () => ({
    p: '16px 32px 20px',
  }),
  header: () => ({
    bgcolor: 'blue.main',
    p: '9px 16px',
    textAlign: 'center',
  }),
  headerTitle: () => ({
    color: '#fff',
  }),
  quoteInfoHolder: (theme: any) => ({
    bgcolor: theme.palette.grey[100],
    p: '16px 24px',
  }),
  quoteInfo: () => ({
    pt: '13px',
    borderTop: `1px solid #D2D6DF`,
  }),
  quoteInfoLabel: (theme: any) => ({
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '1.42857',
    color: theme.palette.blue.dull_blue,
    mt: '8px',
    '&:first-of-type': {
      mt: '0',
    },
    '& > span': {
      color: theme.palette.custom.main,
      fontWeight: '400',
    },
  }),
  buyerInfoTitle: (theme: any) => ({
    fontWeight: '600',
    color: theme.palette.grey[800],
  }),
  buyerInfoText: (theme: any) => ({
    color: theme.palette.custom.main,
    mt: '8px',
    lineHeight: '1.42857',
  }),

  voucher: (theme: any) => ({
    p: '16px 24px',
    bgcolor: theme.palette.grey[100],
    mt: '16px',
  }),
  vRow: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: '10px',
    '&:first-of-type': {
      mt: '0',
    },
  }),
  vCellLef: (theme: any) => ({
    fontSize: '14px',
    fontWeight: '500',
    color: theme.palette.blue.dull_blue,
    lineHeight: '1.42857',
  }),
  vCellRight: (theme: any) => ({
    fontSize: '14px',
    fontWeight: '600',
    color: theme.palette.blue.dull_blue,
    lineHeight: '1.42857',
  }),
  total: (theme: any) => ({
    fontSize: '16px',
    fontWeight: '600',
    color: theme.palette.blue.dull_blue,
    lineHeight: '1.5',
  }),
  signatureCard: (theme: any) => ({
    p: '16px 24px',
    bgcolor: theme.palette.grey[100],
    mt: '16px',
    height: '132px',
    display: 'flex',
    justifyContent: 'space-between',
  }),
  signatureBox: () => ({
    display: 'flex',
    flexDirection: 'column',
  }),
  signatureSpace: () => ({
    flex: '1',
    display: 'flex',
    alignItems: 'flex-end',
    pb: '6px',
  }),
  dateBox: () => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }),
  dateSpace: () => ({
    pb: '6px',
    fontSize: '14px',
    fontWeight: '400',
    textAlign: 'center',
    color: 'blue.dull_blue',
  }),
  boxLabel: (theme: any) => ({
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '1.42857',
    color: 'blue.dull_blue',
    width: '95px',
    pt: '7px',
    borderTop: `1px solid ${theme.palette.grey[700]}`,
    textAlign: 'center',
  }),
};
