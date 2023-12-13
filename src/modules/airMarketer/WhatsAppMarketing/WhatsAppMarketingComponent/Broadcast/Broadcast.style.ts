export const styles = {
  statusBadge: (theme: any) => {
    return {
      background: theme?.palette?.grey[400],
      alignItems: 'center',
      width: 'fit-content',
      borderRadius: '30px',
      display: 'flex',
      p: '8px 16px',
      gap: 1,
    };
  },
};
