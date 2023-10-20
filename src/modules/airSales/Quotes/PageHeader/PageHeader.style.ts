export const styles = {
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
    border: `1px solid ${theme.palette.grey[0]}`,
    color: theme.palette.custom.main,
    fontSize: '14px',
    fontWeight: '500',
    p: '6px 18px',
    height: '36px',
  }),
};
