export const styles = {
  paymentsTableWrapper: (theme: any) => ({
    border: `1px solid ${theme.palette.custom.off_white_three}`,
    borderRadius: '8px',
    boxShadow: `0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A`,
  }),
  paymentsHeader: (theme: any) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: '16px 24px',
    borderBottom: `1px solid ${theme.palette.custom.off_white_three}`,
  }),
  paymentTitle: () => ({
    color: '#1F2937',
  }),
  invoicesHeaderValue: (theme: any) => ({
    color: theme.palette.grey[800],
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '1.555556',
    mt: '4px',
  }),
  invoicesHeaderLabel: () => ({
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '1.5',
    color: 'custom.main',
  }),
  tableToolbar: () => ({
    display: 'flex',
    alignItems: 'center',
    p: '12px 24px',
  }),
  tableSearch: () => ({}),
  tableToolbarActions: () => ({
    ml: 'auto',
  }),
  actionButton: (theme: any) => ({
    border: `1px solid ${theme.palette.grey[0]}`,
    color: theme.palette.custom.main,
    fontSize: '14px',
    fontWeight: '500',
    p: '6px 18px',
    height: '36px',
  }),
  chip: (theme: any) => ({
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.slateBlue.main,
    p: '4px 12px',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '1.42857',
    borderRadius: '16px',
    textAlign: 'center',
    display: 'inline-flex',
  }),
};
