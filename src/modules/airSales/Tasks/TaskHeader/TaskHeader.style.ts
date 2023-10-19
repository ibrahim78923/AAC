export const styles = (theme: any) => {
  return {
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      flexWrap: 'wrap',
      gap: '15px',
    },
    title: {
      flex: 1,
      fontSize: '24px',
      fontWeight: 600,
      color: theme.palette.grey[800],
    },
    action: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '8px',
    },
  };
};
