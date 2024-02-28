export const styles = {
  hour: (theme: any) => ({
    border: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
    borderRadius: '12px',
    p: '16px',
    display: 'flex',
    alignItems: 'center',
  }),
  hourLeft: () => ({
    flex: '1',
  }),
  hourTitle: () => ({
    display: 'flex',
    alignItems: 'center',
  }),
  hourBadge: (theme: any) => ({
    ml: '16px',
    backgroundColor: theme?.palette?.grey[400],
    p: '2px 8px',
    borderRadius: '8px',
    fontSize: '12px',
    lineHeight: '1.5',
    color: 'slateBlue.main',
  }),
  UTC: () => ({
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    color: 'custom.main',
    mt: '8px',
  }),
  hourRight: () => ({
    ml: '16px',
  }),
  editBtn: () => ({
    ml: '24px',
  }),
};
