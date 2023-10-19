export const styles = {
  addButtonStyle: (theme: any) => ({
    marginRight: '12px',
    backgroundColor: theme?.palette?.primary?.light,
    color: theme?.palette?.primary?.main,
    '&:hover': {
      bgcolor: theme?.palette?.grey[400],
      border: 'none',
    },
    border: 'none',
  }),
};
