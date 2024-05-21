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

  voucher: (theme: any) => ({
    p: '16px 24px',
    bgcolor: theme?.palette?.grey[100],
  }),
  vRow: () => ({
    display: { sm: 'block', md: 'flex' },
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: '15px',
    '&:first-of-type': {
      mt: '0',
    },
  }),
  vCellLef: (theme: any) => ({
    fontSize: '16px',
    fontWeight: '600',
    color: theme?.palette?.grey[800],
    lineHeight: '1.42857',
  }),
  vCellRight: (theme: any) => ({
    fontSize: '14px',
    fontWeight: '400',
    color: theme?.palette?.custom?.main,
    lineHeight: '1.42857',
  }),
};
