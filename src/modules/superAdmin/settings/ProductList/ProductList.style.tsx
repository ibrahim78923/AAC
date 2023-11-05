export const styles = {
  productListCard: (theme: any) => {
    return {
      width: '100%',
      height: '100px',
      border: `1px solid ${theme.palette.grey[700]}`,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      padding: '20px',
      gap: '15px',
      position: 'relative',
      cursor: 'pointer',
    };
  },
  productBadge: (status: any) => {
    return {
      position: 'absolute',
      background: status ? 'rgba(71, 178, 99, 0.20)' : '#F3F4F6',
      borderRadius: '20px',
      padding: '2px 8px',
      right: '10px',
      top: '10px',
    };
  },
};
