export const styles = {
  content: () => ({
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '1152px',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    p: '12px 24px 24px',
  }),
  topBar: () => ({
    display: 'flex',
    justifyContent: 'flex-end',
    mb: '12px',
  }),
  modalClose: () => ({
    cursor: 'pointer',
  }),
  blueCard: () => ({
    p: '20px 32px',
    bgcolor: 'blue.main',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
  }),
  cardLeft: () => ({
    display: 'flex',
  }),
  cardLeftText: (theme: any) => ({
    color: theme?.palette?.common?.white,
    mt: '8px',
    fontSize: '12px',
    display: 'block',
  }),
  cardRight: () => ({}),
  cardRightText: (theme: any) => ({
    color: theme?.palette?.grey[100],
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.42857',
    '& > span': {
      fontWeight: '700',
      color: theme?.palette?.grey[400],
    },
  }),
  userInfo: () => ({
    display: 'flex',
    alignItems: 'center',
  }),
  avatar: () => ({
    backgroundColor: 'primary.main',
    height: '40px',
    width: '40px',
    mr: '6px',
  }),
  userName: () => ({
    fontSize: '12px',
    fontWeight: '700',
    lineHeight: '1.5',
    color: '#fff',
  }),
  orgName: (theme: any) => ({
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '1.5',
    color: theme?.palette?.common?.white,
  }),
  invoiceInfo: (theme: any) => ({
    bgcolor: theme.palette.grey[100],
    padding: '8px 24px',
    mt: '16px',
  }),
  invoiceInfoTitle: (theme: any) => ({
    fontSize: '14px',
    fontWeight: '500',
    color: theme?.palette?.blue?.dull_blue,
    lineHeight: '1.42857',
    '& > span': {
      color: theme?.palette?.custom?.main,
      fontWeight: '400',
    },
  }),
  productCont: (theme: any) => ({
    border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
    mt: '16px',
    borderRadius: '8px',
  }),
  productHeading: (theme: any) => ({
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '1.55556',
    color: theme?.palette?.grey[800],
    p: '16px 20px',
  }),

  voucher: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[700]}`,
    mt: '24px',
    borderRadius: '8px',
    p: '12px 24px',
  }),
  vRow: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    py: '12px',
  }),
  vLabel: () => ({
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '1.5',
    color: 'slateBlue.main',
  }),
  vValue: () => ({
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '1.55556',
    color: 'slateBlue.main',
  }),
};
