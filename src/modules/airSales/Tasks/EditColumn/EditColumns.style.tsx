export const styles = {
  BoxStyle: (theme: any) => ({
    padding: '0px 16px',
    borderRadius: '8px',
    border: `1.5px solid ${theme?.palette?.grey[700]}`,
    color: theme?.palette?.grey[900],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  ChildBoxStyle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 400,
  },
  column: (theme: any, isActive: any) => {
    return {
      backgroundColor: isActive ? theme?.grey[100] : theme?.common?.white,
      border: `1px solid ${theme?.grey[700]}`,
      borderRadius: '8px',
      display: 'flex',
      color: theme?.grey[900],
      margin: '5px',
      '& ._root': {
        flex: 1,
        '& ._label': { flex: 1 },
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
      },
    };
  },
};
