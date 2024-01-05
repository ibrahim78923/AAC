export const styles = {
  tableToolbar: () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: '12px 24px',
  }),
  actionButton: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[0]}`,
    color: theme?.palette?.custom?.main,
    fontSize: '14px',
    fontWeight: '500',
    p: '6px 18px',
    height: '36px',
  }),
};
