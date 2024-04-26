export const styles = {
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
