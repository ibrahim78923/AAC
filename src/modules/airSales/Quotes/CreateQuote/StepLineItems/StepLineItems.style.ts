export const styles = {
  TableWrapper: (theme: any) => ({
    border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
    borderRadius: '8px',
    boxShadow: `0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A`,
  }),
  pageHeader: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: '16px 24px',
  }),
  pageHeaderTitle: () => ({
    color: '#1F2937',
  }),
  actionButton: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[0]}`,
    color: theme?.palette?.custom?.main,
    fontSize: '14px',
    fontWeight: '500',
    p: '6px 18px',
    height: '36px',
  }),
  cellChip: (theme: any) => ({
    width: '109px',
    height: '44px',
    bgcolor: theme?.palette?.grey[100],
    p: '10px 16px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
  }),
  actionBtn: () => ({
    cursor: 'pointer',
  }),
  voucherCont: () => ({
    display: 'flex',
    justifyContent: 'flex-end',
    mt: '24px',
  }),
  voucher: (theme: any) => ({
    width: '325px',
    border: `1px solid ${theme?.palette?.grey[700]}`,
    borderRadius: '10px',
  }),
  voucherHeader: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: '11px 20px 5px',
  }),
  vHeadCell: (theme: any) => ({
    fontSize: '18px',
    fontWeight: '500',
    color: theme?.palette?.slateBlue?.main,
  }),
  voucherBody: () => ({
    p: '0 20px 10px',
  }),
  vRow: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    py: '5px',
  }),
  bodyCell: (theme: any) => ({
    fontSize: '14px',
    fontWeight: '400',
    color: theme?.palette?.slateBlue?.main,
  }),
  bodyCellH: (theme: any) => ({
    fontSize: '14px',
    fontWeight: '500',
    color: theme?.palette?.slateBlue?.main,
  }),
  voucherFooter: (theme: any) => ({
    p: '12px 24px',
    bgcolor: theme.palette.grey[100],
    borderTop: `1px solid ${theme?.palette?.grey[700]}`,
    display: 'flex',
    justifyContent: 'space-between',
  }),
  fCell: (theme: any) => ({
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '1.555556',
    color: theme?.palette?.slateBlue?.main,
  }),
};
