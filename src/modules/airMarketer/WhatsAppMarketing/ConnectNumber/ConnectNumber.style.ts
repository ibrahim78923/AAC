export const styles = {
  header: () => ({
    display: 'flex',
    alignItems: 'center',
  }),
  icon: () => ({
    height: '55px',
    width: '55px',
    mr: '16px',
  }),
  headerText: () => ({
    fontSize: '14px',
    color: 'custom.main',
    lineHeight: '1.42857',
    mt: '4px',
  }),
  divider: (theme: any) => ({
    borderTop: `1px solid ${theme.palette.grey[700]}`,
    my: '36px',
  }),
  listItemText: (theme: any) => ({
    color: theme.palette.custom.main,
  }),
};
